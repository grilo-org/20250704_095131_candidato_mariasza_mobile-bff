import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CatsApiService } from '../cats-api.service';

@Injectable()
export class CatsCacheJob {
  private readonly logger = new Logger(CatsCacheJob.name);

  constructor(private readonly catsApi: CatsApiService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateBreedsCache() {
    this.logger.log('Atualizando cache de raças de gato...');
    try {
      await this.catsApi.getAllBreeds();
      this.logger.log('Cache atualizado com sucesso!');
    } catch (err) {
      this.logger.error('Erro ao atualizar cache:', err.message);
    }
  }
}
