import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
  const { email, senha } = dto;

  // 1. buscar usuário
  const usuario = await this.usuarioRepository.findOne({
    where: { email },
  });

  // 2. validar existência
  if (!usuario) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  // 3. comparar senha (AGORA sim existe senhaValida)
  const senhaValida = await bcrypt.compare(
    senha,
    usuario.senha_hash,
  );

  // 4. validar senha
  if (!senhaValida) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  // 5. gerar token
  const token = this.jwtService.sign({
    sub: usuario.id,
    email: usuario.email,
    role: usuario.role, 
  });

  return {
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}
}