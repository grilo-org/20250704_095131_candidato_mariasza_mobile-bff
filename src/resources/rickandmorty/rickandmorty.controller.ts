import { Controller, Get } from '@nestjs/common';
import { RickAndMortyService } from './rickandmorty.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RickAndMortyCharacterResponseDto } from './dto/rickandmorty-character.repsonse.dto';

@ApiTags('Rick and Morty')
@Controller('rickandmorty')
export class RickAndMortyController {
  constructor(private readonly service: RickAndMortyService) {}

  @Get('characters')
  @ApiOperation({ summary: 'Lista personagens do universo Rick and Morty' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso',
    type: [RickAndMortyCharacterResponseDto],
  })
  async getCharacters(): Promise<RickAndMortyCharacterResponseDto> {
    return this.service.getRandomCharacter();
  }
}
