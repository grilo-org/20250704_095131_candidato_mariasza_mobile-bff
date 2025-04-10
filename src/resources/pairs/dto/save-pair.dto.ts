import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RickAndMortyCharacterResponseDto } from 'src/resources/rickandmorty/dto/rickandmorty-character.response.dto';
import { CatImageResponseDto } from 'src/resources/cats/dto/cat-image.response.dto';
import { IsNotEmpty } from '@nestjs/class-validator';

export class SavePairDto {
  @Expose()
  @ApiProperty({ type: () => RickAndMortyCharacterResponseDto })
  @Type(() => RickAndMortyCharacterResponseDto)
  @IsNotEmpty()
  character: RickAndMortyCharacterResponseDto;

  @Expose()
  @ApiProperty({ type: () => CatImageResponseDto })
  @Type(() => CatImageResponseDto)
  @IsNotEmpty()
  cat: CatImageResponseDto;
}
