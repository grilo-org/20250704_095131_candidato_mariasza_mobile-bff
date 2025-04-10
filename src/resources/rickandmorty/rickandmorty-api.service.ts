import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { HttpService } from 'src/shared/http/http.service';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.response.dto';

@Injectable()
export class RickAndMortyApiService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCharacterById(
    id: number,
  ): Promise<RickAndMortyCharacterResponseDto> {
    const cacheKey = `rick_character_${id}`;
    const cached =
      await this.cacheManager.get<RickAndMortyCharacterResponseDto>(cacheKey);
    if (cached) return cached;

    const baseUrl = this.config.get<string>('RICK_AND_MORTY_API_BASE_URL');
    const url = `${baseUrl}/character/${id}`;

    const character =
      await this.http.makeRequest<RickAndMortyCharacterResponseDto>({
        method: 'GET',
        url,
      });

    await this.cacheManager.set(cacheKey, character, 3600);
    return character;
  }

  async searchCharactersByName(
    name: string,
  ): Promise<RickAndMortyCharacterResponseDto[]> {
    const cacheKey = `rick_character_search_${name.toLowerCase()}`;
    const cached =
      await this.cacheManager.get<RickAndMortyCharacterResponseDto[]>(cacheKey);
    if (cached) return cached;

    const baseUrl = this.config.get<string>('RICK_AND_MORTY_API_BASE_URL');
    const url = `${baseUrl}/character`;

    const response = await this.http.makeRequest<{
      results: RickAndMortyCharacterResponseDto[];
    }>({
      method: 'GET',
      url,
      query: { name },
    });

    await this.cacheManager.set(cacheKey, response.results, 3600);
    return response.results;
  }
}
