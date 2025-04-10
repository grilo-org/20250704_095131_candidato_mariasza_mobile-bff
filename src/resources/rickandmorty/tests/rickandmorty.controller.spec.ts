import { Test, TestingModule } from '@nestjs/testing';
import { RickAndMortyController } from '../rickandmorty.controller';
import { RickAndMortyService } from '../rickandmorty.service';

describe('RickAndMortyController', () => {
  let controller: RickAndMortyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RickAndMortyController],
      providers: [RickAndMortyService],
    }).compile();

    controller = module.get<RickAndMortyController>(RickAndMortyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
