import { Injectable } from '@nestjs/common';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.response.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/shared/http/http.service';

@Injectable()
export class RickAndMortyApiService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getCharacterById(
    id: number,
  ): Promise<RickAndMortyCharacterResponseDto> {
    const baseUrl = this.config.get<string>('RICK_AND_MORTY_API_BASE_URL');
    const url = `${baseUrl}/character/${id}`;

    return this.http.makeRequest<RickAndMortyCharacterResponseDto>({
      method: 'GET',
      url,
    });
  }
}
