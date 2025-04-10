import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/shared/http/http.service';
import { CatImageResponseDto } from './dto/cat-image.response.dto';

@Injectable()
export class CatsApiService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private getHeaders() {
    return {
      'x-api-key': this.config.get<string>('THE_CAT_API_KEY'),
    };
  }

  async getRandomImage(): Promise<CatImageResponseDto> {
    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/images/search`;

    const result = await this.http.makeRequest<CatImageResponseDto[]>({
      method: 'GET',
      url,
      query: { has_breeds: 1 },
      headers: this.getHeaders(),
    });

    return result[0];
  }

  async searchCatImagesByBreedId(
    breedId: string,
  ): Promise<CatImageResponseDto[]> {
    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/images/search`;

    return this.http.makeRequest<CatImageResponseDto[]>({
      method: 'GET',
      url,
      query: { breed_ids: breedId, has_breeds: 1 },
      headers: this.getHeaders(),
    });
  }
}
