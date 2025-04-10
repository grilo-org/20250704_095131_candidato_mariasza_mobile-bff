import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import { CatsModule } from '../cats/cats.module';
import { RickAndMortyModule } from '../rickandmorty/rickandmorty.module';

@Module({
  imports: [RickAndMortyModule, CatsModule],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
