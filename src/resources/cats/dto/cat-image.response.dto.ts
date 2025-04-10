import { Expose, Type } from 'class-transformer';
import { CatBreedDto } from './cat-breed.dto';

export class CatImageResponseDto {
  @Expose()
  id: string;

  @Expose()
  url: string;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose()
  @Type(() => CatBreedDto)
  breeds?: CatBreedDto[];
}
