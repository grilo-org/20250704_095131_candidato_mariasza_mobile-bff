import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RickAndMortyApiService } from './rickandmorty-api.service';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.response.dto';

@Injectable()
export class RickAndMortyService {
  constructor(private readonly api: RickAndMortyApiService) {}

  async getRandomCharacter(): Promise<RickAndMortyCharacterResponseDto> {
    const maxId = 826;
    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const randomId = Math.floor(Math.random() * maxId) + 1;

      try {
        return await this.api.getCharacterById(randomId);
      } catch (error) {
        if (error?.response?.status !== 404) {
          throw error;
        }
      }
    }

    throw new InternalServerErrorException(
      'Unable to retrieve a valid character after several attempts.',
    );
  }

  async searchCharactersByName(
    name: string,
  ): Promise<RickAndMortyCharacterResponseDto[]> {
    const characters = await this.api.searchCharactersByName(name);

    if (!characters.length) {
      throw new InternalServerErrorException(
        'No characters found with the provided name.',
      );
    }

    return characters;
  }
}
