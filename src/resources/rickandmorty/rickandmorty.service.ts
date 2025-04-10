import { Injectable } from '@nestjs/common';
import { RickAndMortyApiService } from './rickandmorty-api.service';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.repsonse.dto';

@Injectable()
export class RickAndMortyService {
  constructor(private readonly api: RickAndMortyApiService) {}

  async getRandomCharacter(): Promise<RickAndMortyCharacterResponseDto> {
    const maxId = 826;
    const randomId = Math.floor(Math.random() * maxId) + 1;
    return this.api.getCharacterById(randomId);
  }
}
