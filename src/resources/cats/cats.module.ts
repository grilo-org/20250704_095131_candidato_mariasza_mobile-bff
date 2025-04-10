import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsApiService } from './cats-api.service';
import { HttpModule } from 'src/shared/http/http.module';

@Module({
  controllers: [CatsController],
  imports: [HttpModule],
  providers: [CatsService, CatsService, CatsApiService],
  exports: [CatsService],
})
export class CatsModule {}
