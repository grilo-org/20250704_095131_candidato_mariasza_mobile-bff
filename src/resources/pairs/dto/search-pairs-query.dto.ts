import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPairsQueryDto {
  @ApiPropertyOptional({
    description: 'Parte do nome do personagem de Rick and Morty',
  })
  @IsOptional()
  @IsString()
  characterName?: string;

  @ApiPropertyOptional({ description: 'Raça do gato (ex: bengal)' })
  @IsOptional()
  @IsString()
  catBreed?: string;
}
