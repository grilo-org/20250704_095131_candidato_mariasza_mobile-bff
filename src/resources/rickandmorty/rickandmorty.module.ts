import { Module } from '@nestjs/common';
import { RickAndMortyController } from './rickandmorty.controller';
import { RickAndMortyService } from './rickandmorty.service';
import { RickAndMortyApiService } from './rickandmorty-api.service';
import { HttpModule } from 'src/shared/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [RickAndMortyController],
  providers: [RickAndMortyService, RickAndMortyApiService],
})
export class RickAndMortyModule {}
