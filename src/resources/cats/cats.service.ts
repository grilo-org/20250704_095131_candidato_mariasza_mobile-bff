import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CatsApiService } from './cats-api.service';
import { CatImageResponseDto } from './dto/cat-image.response.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsApi: CatsApiService) {}

  async getRandomCatImage(): Promise<CatImageResponseDto> {
    return this.catsApi.getRandomImage();
  }

  async searchCatImagesByBreedId(
    breedId: string,
  ): Promise<CatImageResponseDto[]> {
    const cats = await this.catsApi.searchCatImagesByBreedId(breedId);

    if (!cats.length) {
      throw new InternalServerErrorException(
        'No cat images found with the provided breed ID.',
      );
    }

    return cats;
  }
}
