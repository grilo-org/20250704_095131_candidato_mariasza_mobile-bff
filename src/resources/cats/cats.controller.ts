import { plainToInstance } from 'class-transformer';
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatImageResponseDto } from './dto/cat-image.response.dto';
import { CatBreedDto } from './dto/cat-breed.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiExcludeEndpoint()
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

  @Get('breeds')
  @ApiOperation({ summary: 'Lista todas as raças de gatos disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de raças retornada com sucesso',
    type: [CatBreedDto],
  })
  async getAllBreeds(): Promise<CatBreedDto[]> {
    const breeds = await this.catsService.getAllBreeds();
    return plainToInstance(CatBreedDto, breeds, {
      excludeExtraneousValues: true,
    });
  }
}
