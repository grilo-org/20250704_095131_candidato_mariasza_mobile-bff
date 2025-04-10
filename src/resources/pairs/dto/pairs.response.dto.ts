import { CatImageResponseDto } from 'src/resources/cats/dto/cat-image.response.dto';
import { RickAndMortyCharacterResponseDto } from 'src/resources/rickandmorty/dto/rickandmorty-character.response.dto';

export class PairResponseDto {
  cat: CatImageResponseDto;
  character: RickAndMortyCharacterResponseDto;
}
