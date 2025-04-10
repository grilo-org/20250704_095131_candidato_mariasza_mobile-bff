import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PairResponseDto } from './dto/pairs.response.dto';
import { SearchPairsQueryDto } from './dto/search-pairs-query.dto';
import { plainToInstance } from 'class-transformer';
import { SavePairDto } from './dto/save-pair.dto';

@ApiTags('Pairs')
@Controller('pairs')
export class PairsController {
  constructor(private readonly service: PairsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna um par aleatório: um personagem de Rick and Morty + um gato',
  })
  @ApiResponse({
    status: 200,
    description: 'Par gerado com sucesso',
    type: PairResponseDto,
  })
  async getRandomPair(): Promise<PairResponseDto> {
    const result = await this.service.getRandomPair();
    return plainToInstance(PairResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get('search')
  @ApiOperation({
    summary: 'Busca um par aleatório com filtros por personagem e raça de gato',
  })
  @ApiResponse({
    status: 200,
    description: 'Par retornado com sucesso',
    type: PairResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Nenhum par encontrado' })
  async searchPair(
    @Query() query: SearchPairsQueryDto,
  ): Promise<PairResponseDto> {
    const result = await this.service.searchFilteredPair(
      query.characterName,
      query.catBreed,
    );

    return plainToInstance(PairResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Post('favorite')
  @ApiOperation({ summary: 'Salva um par como favorito' })
  @ApiResponse({ status: 201, description: 'Par salvo com sucesso' })
  async saveFavorite(@Body() body: SavePairDto): Promise<void> {
    await this.service.saveFavoritePair(body);
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Lista os pares favoritos salvos' })
  @ApiResponse({ status: 200, description: 'Lista de pares favoritos' })
  async getFavorites(): Promise<PairResponseDto[]> {
    return this.service.getFavoritePairs();
  }
}
