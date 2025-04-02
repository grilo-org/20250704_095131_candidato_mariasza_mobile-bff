import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsApiService } from './cats-api.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsService, CatsApiService],
})
export class CatsModule {}
