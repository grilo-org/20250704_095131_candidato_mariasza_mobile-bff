import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { CatsApiService } from '../cats-api.service';
import { CatsService } from '../cats.service';

describe('CatsService', () => {
  let service: CatsService;
  let apiService: CatsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsApiService,
          useValue: {
            getRandomImage: jest.fn(),
            searchCatImagesByBreedId: jest.fn(),
            getAllBreeds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    apiService = module.get<CatsApiService>(CatsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandomCatImage', () => {
    it('should return a random cat image', async () => {
      const mockCat = { id: 'abc', url: 'url' };
      jest
        .spyOn(apiService, 'getRandomImage')
        .mockResolvedValue(mockCat as any);

      const result = await service.getRandomCatImage();
      expect(result).toEqual(mockCat);
      expect(apiService.getRandomImage).toHaveBeenCalled();
    });
  });

  describe('searchCatImagesByBreedId', () => {
    it('should return cat images for a breed', async () => {
      const mockImages = [{ id: 'cat1' }, { id: 'cat2' }];
      jest
        .spyOn(apiService, 'searchCatImagesByBreedId')
        .mockResolvedValue(mockImages as any);

      const result = await service.searchCatImagesByBreedId('beng');
      expect(result).toEqual(mockImages);
    });

    it('should throw if no images are returned', async () => {
      jest.spyOn(apiService, 'searchCatImagesByBreedId').mockResolvedValue([]);

      await expect(service.searchCatImagesByBreedId('beng')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getAllBreeds', () => {
    it('should return all cat breeds', async () => {
      const mockBreeds = [{ id: 'beng', name: 'Bengal' }];
      jest
        .spyOn(apiService, 'getAllBreeds')
        .mockResolvedValue(mockBreeds as any);

      const result = await service.getAllBreeds();
      expect(result).toEqual(mockBreeds);
    });
  });
});
