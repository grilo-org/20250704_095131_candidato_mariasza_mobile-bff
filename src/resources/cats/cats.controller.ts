import { plainToInstance } from 'class-transformer';
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatImageResponseDto } from './dto/cat-image.response.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('random')
  @ApiOperation({ summary: 'Retorna uma imagem aleatória de gato' })
  @ApiResponse({
    status: 200,
    description: 'Imagem retornada com sucesso',
    type: CatImageResponseDto,
  })
  async getRandomImage(): Promise<CatImageResponseDto> {
    const result = await this.catsService.getRandomCatImage();

    return plainToInstance(CatImageResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
