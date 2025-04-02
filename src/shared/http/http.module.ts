import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { HttpService } from './http.service';

@Module({
  imports: [AxiosModule],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
