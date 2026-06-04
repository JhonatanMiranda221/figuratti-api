import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {SelecaoService} from "../services/selecao.service";
import {CreateSelecaoDto} from "../dto/create-selecao.dto";
import {SelecaoEntity} from "../entities/selecao.entity";
import { ParseIntPipe } from '@nestjs/common';
import { UpdateSelecaoDto } from '../dto/update-selecao.dto';

@Controller('/selecoes')
export class SelecaoController {
    constructor(private readonly selecaoService: SelecaoService) {}

    @Post()
    async create(@Body() dto: CreateSelecaoDto): Promise<SelecaoEntity> {
        return this.selecaoService.create(dto);
    }

    @Get()
    async findAll(): Promise<SelecaoEntity[]> {
        return this.selecaoService.findAll();
    }

    @Get(':id')
    async findById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<SelecaoEntity> {
        return this.selecaoService.findById(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateSelecaoDto,
    ): Promise<SelecaoEntity> {
        return this.selecaoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.selecaoService.delete(id);
    }
}