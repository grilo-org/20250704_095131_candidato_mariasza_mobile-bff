import { Injectable } from '@nestjs/common';
import { CreatePairDto } from './dto/create-pair.dto';
import { UpdatePairDto } from './dto/update-pair.dto';

@Injectable()
export class PairsService {
  create(createPairDto: CreatePairDto) {
    return 'This action adds a new pair';
  }

  findAll() {
    return `This action returns all pairs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pair`;
  }

  update(id: number, updatePairDto: UpdatePairDto) {
    return `This action updates a #${id} pair`;
  }

  remove(id: number) {
    return `This action removes a #${id} pair`;
  }
}
