import { Injectable } from '@nestjs/common';
import { CreateRickandmortyDto } from './dto/create-rickandmorty.dto';
import { UpdateRickandmortyDto } from './dto/update-rickandmorty.dto';

@Injectable()
export class RickandmortyService {
  create(createRickandmortyDto: CreateRickandmortyDto) {
    return 'This action adds a new rickandmorty';
  }

  findAll() {
    return `This action returns all rickandmorty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rickandmorty`;
  }

  update(id: number, updateRickandmortyDto: UpdateRickandmortyDto) {
    return `This action updates a #${id} rickandmorty`;
  }

  remove(id: number) {
    return `This action removes a #${id} rickandmorty`;
  }
}
