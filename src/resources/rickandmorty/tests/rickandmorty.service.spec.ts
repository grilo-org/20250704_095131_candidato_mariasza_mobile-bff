import { Test, TestingModule } from '@nestjs/testing';
import { RickAndMortyService } from '../rickandmorty.service';
import { RickAndMortyApiService } from '../rickandmorty-api.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let apiService: RickAndMortyApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RickAndMortyService,
        {
          provide: RickAndMortyApiService,
          useValue: {
            getCharacterById: jest.fn(),
            searchCharactersByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RickAndMortyService>(RickAndMortyService);
    apiService = module.get<RickAndMortyApiService>(RickAndMortyApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandomCharacter', () => {
    it('should return a character on first try', async () => {
      const mockCharacter = { id: 1, name: 'Rick' };
      jest
        .spyOn(apiService, 'getCharacterById')
        .mockResolvedValue(mockCharacter as any);

      const result = await service.getRandomCharacter();
      expect(result).toEqual(mockCharacter);
      expect(apiService.getCharacterById).toHaveBeenCalled();
    });

    it('should retry if character is not found (404) and eventually return', async () => {
      const notFoundError = { response: { status: 404 } };
      const successCharacter = { id: 5, name: 'Morty' };

      jest
        .spyOn(apiService, 'getCharacterById')
        .mockRejectedValueOnce(notFoundError)
        .mockResolvedValueOnce(successCharacter as any);

      const result = await service.getRandomCharacter();
      expect(result).toEqual(successCharacter);
    });

    it('should throw error after max attempts if only 404s', async () => {
      const notFoundError = { response: { status: 404 } };
      jest
        .spyOn(apiService, 'getCharacterById')
        .mockRejectedValue(notFoundError);

      await expect(service.getRandomCharacter()).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(apiService.getCharacterById).toHaveBeenCalledTimes(5);
    });

    it('should rethrow if error is not 404', async () => {
      const unexpectedError = { response: { status: 500 }, message: 'fail' };
      jest
        .spyOn(apiService, 'getCharacterById')
        .mockRejectedValue(unexpectedError);

      await expect(service.getRandomCharacter()).rejects.toEqual(
        unexpectedError,
      );
    });
  });

  describe('searchCharactersByName', () => {
    it('should return characters if found', async () => {
      const mockList = [{ id: 1, name: 'Rick' }];
      jest
        .spyOn(apiService, 'searchCharactersByName')
        .mockResolvedValue(mockList as any);

      const result = await service.searchCharactersByName('rick');
      expect(result).toEqual(mockList);
    });

    it('should throw if no characters found', async () => {
      jest.spyOn(apiService, 'searchCharactersByName').mockResolvedValue([]);

      await expect(service.searchCharactersByName('nomefalso')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
