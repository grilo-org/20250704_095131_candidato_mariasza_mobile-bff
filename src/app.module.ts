import { Module } from '@nestjs/common';
import { CatsModule } from './resource/cats/cats.module';
import { PairsModule } from './resource/pairs/pairs.module';
import { RickandmortyModule } from './resource/rickandmorty/rickandmorty.module';
import { HttpModule } from './shared/http/http.module';

@Module({
  imports: [CatsModule, PairsModule, RickandmortyModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
