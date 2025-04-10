import { Test, TestingModule } from '@nestjs/testing';
import { PairsService } from '../pairs.service';
import { RickAndMortyService } from '../../rickandmorty/rickandmorty.service';
import { CatsService } from '../../cats/cats.service';
import { NotFoundException } from '@nestjs/common';

describe('PairsService', () => {
  let service: PairsService;
  let rickService: RickAndMortyService;
  let catService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PairsService,
        {
          provide: RickAndMortyService,
          useValue: {
            getRandomCharacter: jest.fn(),
            searchCharactersByName: jest.fn(),
          },
        },
        {
          provide: CatsService,
          useValue: {
            getRandomCatImage: jest.fn(),
            searchCatImagesByBreedId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PairsService>(PairsService);
    rickService = module.get<RickAndMortyService>(RickAndMortyService);
    catService = module.get<CatsService>(CatsService);
  });

  describe('getRandomPair', () => {
    it('should return a random pair', async () => {
      const mockCharacter = { id: 1, name: 'Rick' };
      const mockCat = { id: 'abc', url: 'cat.jpg' };

      jest
        .spyOn(rickService, 'getRandomCharacter')
        .mockResolvedValue(mockCharacter as any);
      jest
        .spyOn(catService, 'getRandomCatImage')
        .mockResolvedValue(mockCat as any);

      const result = await service.getRandomPair();
      expect(result).toEqual({ character: mockCharacter, cat: mockCat });
    });
  });

  describe('searchFilteredPair', () => {
    it('should return a pair using filters', async () => {
      const characters = [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Ricky' },
      ];
      const cats = [{ id: 'c1' }, { id: 'c2' }];

      jest
        .spyOn(rickService, 'searchCharactersByName')
        .mockResolvedValue(characters as any);
      jest
        .spyOn(catService, 'searchCatImagesByBreedId')
        .mockResolvedValue(cats as any);

      const result = await service.searchFilteredPair('rick', 'beng');
      expect(result.character).toBeDefined();
      expect(result.cat).toBeDefined();
    });

    it('should fallback to random when no filters are passed', async () => {
      const character = { id: 1, name: 'Random Rick' };
      const cat = { id: 'x' };

      jest
        .spyOn(rickService, 'getRandomCharacter')
        .mockResolvedValue(character as any);
      jest.spyOn(catService, 'getRandomCatImage').mockResolvedValue(cat as any);

      const result = await service.searchFilteredPair();
      expect(result).toEqual({ character, cat });
    });

    it('should throw if no characters found', async () => {
      jest.spyOn(rickService, 'searchCharactersByName').mockResolvedValue([]);
      jest
        .spyOn(catService, 'searchCatImagesByBreedId')
        .mockResolvedValue([{ id: 'x' }] as any);

      await expect(
        service.searchFilteredPair('invalid', 'beng'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if no cats found', async () => {
      jest
        .spyOn(rickService, 'searchCharactersByName')
        .mockResolvedValue([{ id: 1 }] as any);
      jest.spyOn(catService, 'searchCatImagesByBreedId').mockResolvedValue([]);

      await expect(
        service.searchFilteredPair('rick', 'invalid'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
