import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RickAndMortyService } from '../rickandmorty/rickandmorty.service';
import { CatsService } from '../cats/cats.service';
import { PairResponseDto } from './dto/pairs.response.dto';
import { SavePairDto } from './dto/save-pair.dto';

@Injectable()
export class PairsService {
  constructor(
    private readonly rickService: RickAndMortyService,
    private readonly catService: CatsService,
  ) {}

  private favorites: PairResponseDto[] = [];

  async getRandomPair(): Promise<PairResponseDto> {
    const [character, cat] = await Promise.all([
      this.rickService.getRandomCharacter(),
      this.catService.getRandomCatImage(),
    ]);

    return { character, cat };
  }

  async searchFilteredPair(
    characterName?: string,
    catBreed?: string,
  ): Promise<PairResponseDto> {
    const [characters, cats] = await Promise.all([
      characterName
        ? this.rickService.searchCharactersByName(characterName)
        : [await this.rickService.getRandomCharacter()],
      catBreed
        ? this.catService.searchCatImagesByBreedId(catBreed)
        : [await this.catService.getRandomCatImage()],
    ]);

    if (!characters.length || !cats.length) {
      throw new NotFoundException(
        'Nenhum par encontrado com os filtros fornecidos.',
      );
    }

    const character = characters[Math.floor(Math.random() * characters.length)];
    const cat = cats[Math.floor(Math.random() * cats.length)];

    return { character, cat };
  }

  async saveFavoritePair(pair: SavePairDto): Promise<void> {
    const alreadyExists = this.favorites.some(
      (fav) =>
        fav.character.id === pair.character.id && fav.cat.id === pair.cat.id,
    );

    if (alreadyExists) {
      throw new ConflictException('Este par já foi salvo como favorito.');
    }

    this.favorites.push(pair);
  }

  async getFavoritePairs(): Promise<PairResponseDto[]> {
    return this.favorites;
  }
}
