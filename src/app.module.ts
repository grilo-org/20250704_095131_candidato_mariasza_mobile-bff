import { Module } from '@nestjs/common';
import { HttpModule } from './shared/http/http.module';
import { CatsModule } from './resources/cats/cats.module';
import { PairsModule } from './resources/pairs/pairs.module';
import { RickAndMortyModule } from './resources/rickandmorty/rickandmorty.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 60,
      max: 100,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CatsModule,
    PairsModule,
    RickAndMortyModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
