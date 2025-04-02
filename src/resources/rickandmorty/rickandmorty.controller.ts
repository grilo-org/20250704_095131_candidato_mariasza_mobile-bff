import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { CreateRickandmortyDto } from './dto/create-rickandmorty.dto';
import { UpdateRickandmortyDto } from './dto/update-rickandmorty.dto';

@Controller('rickandmorty')
export class RickandmortyController {
  constructor(private readonly rickandmortyService: RickandmortyService) {}

  @Post()
  create(@Body() createRickandmortyDto: CreateRickandmortyDto) {
    return this.rickandmortyService.create(createRickandmortyDto);
  }

  @Get()
  findAll() {
    return this.rickandmortyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rickandmortyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRickandmortyDto: UpdateRickandmortyDto) {
    return this.rickandmortyService.update(+id, updateRickandmortyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rickandmortyService.remove(+id);
  }
}
