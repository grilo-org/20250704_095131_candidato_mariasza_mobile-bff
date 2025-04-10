import { Injectable } from '@nestjs/common';
import { CatsApiService } from './cats-api.service';
import { CatImageResponseDto } from './dto/cat-image.response.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsApi: CatsApiService) {}

  async getRandomCatImage(): Promise<CatImageResponseDto> {
    return this.catsApi.getRandomImage();
  }
}
