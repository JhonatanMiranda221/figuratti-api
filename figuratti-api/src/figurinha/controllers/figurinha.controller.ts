import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';

import { FigurinhaService } from '../services/figurinha.service';
import { FigurinhaEntity } from '../entities/figurinha.entity';
import { CreateFigurinhaDto } from '../dto/create-figurinha.dto';
import { UpdateFigurinhaDto } from '../dto/update-figurinha.dto';

@Controller('/figurinhas')
export class FigurinhaController {
  constructor(
    private readonly figurinhaService: FigurinhaService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateFigurinhaDto,
  ): Promise<FigurinhaEntity> {
    return this.figurinhaService.create(dto);
  }

  @Get()
  async findAll(): Promise<FigurinhaEntity[]> {
    return this.figurinhaService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FigurinhaEntity> {
    return this.figurinhaService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFigurinhaDto,
  ): Promise<FigurinhaEntity> {
    return this.figurinhaService.update(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.figurinhaService.delete(id);
  }
}