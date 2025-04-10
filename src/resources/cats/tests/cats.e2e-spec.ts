import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('CatsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/cats/random (GET) should return a cat image', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/cats/random')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('url');
  });

  it('/v1/cats/breeds (GET) should return a list of cat breeds', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/cats/breeds')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
