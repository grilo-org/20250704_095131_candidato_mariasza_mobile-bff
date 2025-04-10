import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('PairsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/pairs (GET) should return a random pair', async () => {
    const res = await request(app.getHttpServer()).get('/v1/pairs').expect(200);

    expect(res.body).toHaveProperty('character');
    expect(res.body).toHaveProperty('cat');
  });

  it('/v1/pairs/search (GET) with no filters should return a pair', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/pairs/search')
      .expect(200);

    expect(res.body).toHaveProperty('character');
    expect(res.body).toHaveProperty('cat');
  });

  it('/v1/pairs/favorite (POST) should save a pair as favorite', async () => {
    const pair = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      cat: {
        id: 'abc',
        url: 'https://cdn2.thecatapi.com/images/abc.jpg',
        width: 500,
        height: 300,
      },
    };

    await request(app.getHttpServer())
      .post('/v1/pairs/favorite')
      .send(pair)
      .expect(201);
  });

  it('/v1/pairs/favorites (GET) should return list of favorites', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/pairs/favorites')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('character');
    expect(res.body[0]).toHaveProperty('cat');
  });
});
