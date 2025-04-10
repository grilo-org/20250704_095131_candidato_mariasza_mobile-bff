import { Injectable } from '@nestjs/common';
import { RickAndMortyService } from '../rickandmorty/rickandmorty.service';
import { CatsService } from '../cats/cats.service';
import { PairResponseDto } from './dto/pairs.response.dto';

@Injectable()
export class PairsService {
  constructor(
    private readonly rickService: RickAndMortyService,
    private readonly catService: CatsService,
  ) {}

  async getRandomPair(): Promise<PairResponseDto> {
    const [character, cat] = await Promise.all([
      this.rickService.getRandomCharacter(),
      this.catService.getRandomCatImage(),
    ]);

    return { character, cat };
  }
}
