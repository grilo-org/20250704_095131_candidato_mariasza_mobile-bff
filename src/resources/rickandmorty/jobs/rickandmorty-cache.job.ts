import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RickAndMortyApiService } from '../rickandmorty-api.service';

@Injectable()
export class RickAndMortyCacheJob {
  private readonly logger = new Logger(RickAndMortyCacheJob.name);

  constructor(private readonly api: RickAndMortyApiService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async preloadPopularCharacters() {
    this.logger.log('Atualizando cache dos personagens populares...');

    const popular = ['rick', 'morty', 'summer', 'beth', 'jerry'];

    try {
      for (const name of popular) {
        await this.api.searchCharactersByName(name);
      }
      this.logger.log('Cache de personagens populares atualizado!');
    } catch (err) {
      this.logger.error('Erro ao atualizar cache:', err.message);
    }
  }
}
