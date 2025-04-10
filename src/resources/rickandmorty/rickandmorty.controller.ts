import { Controller, Get } from '@nestjs/common';
import { RickAndMortyService } from './rickandmorty.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Rick and Morty')
@Controller('rickandmorty')
export class RickAndMortyController {
  constructor(private readonly service: RickAndMortyService) {}

  @Get('random')
  @ApiOperation({ summary: 'Lista personagens do universo Rick and Morty' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso',
    type: [RickAndMortyCharacterResponseDto],
  })
  async getCharacters(): Promise<RickAndMortyCharacterResponseDto> {
    const result = await this.service.getRandomCharacter();

    return plainToInstance(RickAndMortyCharacterResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
