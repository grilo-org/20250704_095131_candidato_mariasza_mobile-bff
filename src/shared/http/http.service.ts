import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { AxiosRequestConfig, Method } from 'axios';
import { lastValueFrom } from 'rxjs';

interface MakeRequestParams {
  method: Method;
  url: string;
  body?: any;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

@Injectable()
export class HttpService {
  constructor(private readonly http: NestHttpService) {}

  async makeRequest<T = any>(params: MakeRequestParams): Promise<T> {
    const { method, url, body, query, headers, timeout } = params;

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      params: query,
      data: body,
      timeout,
    };

    try {
      const response$ = this.http.request<T>(config);
      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      const message = `[HttpService] Request failed: ${method} ${url} - ${error?.message}`;
      console.error(message);
      throw new InternalServerErrorException(message);
    }
  }
}
