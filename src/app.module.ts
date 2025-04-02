import { Module } from '@nestjs/common';
import { HttpModule } from './shared/http/http.module';
import { CatsModule } from './resources/cats/cats.module';
import { PairsModule } from './resources/pairs/pairs.module';
import { RickandmortyModule } from './resources/rickandmorty/rickandmorty.module';

@Module({
  imports: [CatsModule, PairsModule, RickandmortyModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
