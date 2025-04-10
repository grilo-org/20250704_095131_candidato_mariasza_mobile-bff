import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/shared/http/http.service';
import { CatImageResponseDto } from './dto/cat-image.response.dto';
import { CatBreedDto } from './dto/cat-breed.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CatsApiService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private getHeaders() {
    return {
      'x-api-key': this.config.get<string>('THE_CAT_API_KEY'),
    };
  }

  async getRandomImage(): Promise<CatImageResponseDto> {
    const cacheKey = 'cat_random_image';
    const cached = await this.cacheManager.get<CatImageResponseDto>(cacheKey);
    if (cached) return cached;

    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/images/search`;

    const result = await this.http.makeRequest<CatImageResponseDto[]>({
      method: 'GET',
      url,
      query: { has_breeds: 1 },
      headers: this.getHeaders(),
    });

    const image = result[0];
    await this.cacheManager.set(cacheKey, image, 60);
    return image;
  }

  async searchCatImagesByBreedId(
    breedId: string,
  ): Promise<CatImageResponseDto[]> {
    const cacheKey = `cat_breed_images_${breedId}`;
    const cached = await this.cacheManager.get<CatImageResponseDto[]>(cacheKey);
    if (cached) return cached;

    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/images/search`;

    const result = await this.http.makeRequest<CatImageResponseDto[]>({
      method: 'GET',
      url,
      query: { breed_ids: breedId, has_breeds: 1 },
      headers: this.getHeaders(),
    });

    await this.cacheManager.set(cacheKey, result, 60);
    return result;
  }

  async getAllBreeds(): Promise<CatBreedDto[]> {
    const cacheKey = 'cat_breeds';
    const cached = await this.cacheManager.get<CatBreedDto[]>(cacheKey);
    if (cached) return cached;

    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/breeds`;

    const result = await this.http.makeRequest<CatBreedDto[]>({
      method: 'GET',
      url,
      headers: this.getHeaders(),
    });

    await this.cacheManager.set(cacheKey, result, 3600);
    return result;
  }
}
