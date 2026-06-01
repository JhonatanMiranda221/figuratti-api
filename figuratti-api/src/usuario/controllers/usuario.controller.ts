import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() dto: CreateUsuarioDto): Promise<UsuarioEntity> {
    return this.usuarioService.create(dto);
  }

  @Get()
  async findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioService.findAll();
  }

  @Get('search')
  async search(
    @Query('nome') nome?: string,
    @Query('email') email?: string,
  ): Promise<UsuarioEntity | UsuarioEntity[] | null> {
    if (email) {
      return this.usuarioService.findByEmail(email);
    }

    if (nome) {
      return this.usuarioService.findByName(nome);
    }

    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UsuarioEntity | null> {
    return this.usuarioService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
