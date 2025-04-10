import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RickAndMortyCharacterResponseDto } from 'src/resources/rickandmorty/dto/rickandmorty-character.response.dto';
import { CatImageResponseDto } from 'src/resources/cats/dto/cat-image.response.dto';
import { ValidateNested, IsNotEmpty } from '@nestjs/class-validator';

export class SavePairDto {
  @ApiProperty({ type: () => RickAndMortyCharacterResponseDto })
  @ValidateNested()
  @Type(() => RickAndMortyCharacterResponseDto)
  @IsNotEmpty()
  character: RickAndMortyCharacterResponseDto;

  @ApiProperty({ type: () => CatImageResponseDto })
  @ValidateNested()
  @Type(() => CatImageResponseDto)
  @IsNotEmpty()
  cat: CatImageResponseDto;
}
