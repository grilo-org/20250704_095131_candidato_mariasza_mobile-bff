import { Test, TestingModule } from '@nestjs/testing';
import { PairsService } from '../pairs.service';
import { RickAndMortyService } from '../../rickandmorty/rickandmorty.service';
import { CatsService } from '../../cats/cats.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PairsService', () => {
  let service: PairsService;
  let rickService: RickAndMortyService;
  let catService: CatsService;

  const mockPair = {
    character: { id: 1, name: 'Rick' },
    cat: { id: 'abc', url: 'https://cat.url' },
  };

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
  describe('saveFavoritePair', () => {
    it('should save a favorite pair if not already present', async () => {
      await service.saveFavoritePair(mockPair as any);
      const favorites = await service.getFavoritePairs();
      expect(favorites).toContainEqual(mockPair as any);
    });

    it('should throw ConflictException if pair already exists', async () => {
      await service.saveFavoritePair(mockPair as any);

      await expect(service.saveFavoritePair(mockPair as any)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getFavoritePairs', () => {
    it('should return an array of favorite pairs', async () => {
      await service.saveFavoritePair(mockPair as any);
      const result = await service.getFavoritePairs();
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(mockPair as any);
    });

    it('should return an empty array if no pairs are saved', async () => {
      const result = await service.getFavoritePairs();
      expect(result).toEqual([]);
    });
  });
});
