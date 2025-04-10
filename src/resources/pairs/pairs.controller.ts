import { Controller, Get } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PairResponseDto } from './dto/pairs.response.dto';

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
    return this.service.getRandomPair();
  }
}
