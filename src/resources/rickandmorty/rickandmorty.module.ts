import { Module } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { RickandmortyController } from './rickandmorty.controller';
import { RickandmortyApiService } from './rickandmorty-api.service';

@Module({
  controllers: [RickandmortyController],
  providers: [RickandmortyService, RickandmortyApiService],
})
export class RickandmortyModule {}
