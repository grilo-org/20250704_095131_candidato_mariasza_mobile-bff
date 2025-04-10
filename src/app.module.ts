import { Module } from '@nestjs/common';
import { HttpModule } from './shared/http/http.module';
import { CatsModule } from './resources/cats/cats.module';
import { PairsModule } from './resources/pairs/pairs.module';
import { RickAndMortyModule } from './resources/rickandmorty/rickandmorty.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CatsModule,
    PairsModule,
    RickAndMortyModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
