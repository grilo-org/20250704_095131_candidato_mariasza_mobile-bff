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

  async getRandomImage(): Promise<CatImageResponseDto> {
    const baseUrl = this.config.get<string>('THE_CAT_API_BASE_URL');
    const url = `${baseUrl}/images/search`;

    const result = await this.http.makeRequest<CatImageResponseDto[]>({
      method: 'GET',
      url,
    });

    return result[0];
  }
}
