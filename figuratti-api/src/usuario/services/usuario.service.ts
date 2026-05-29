import { HttpException, Inject, Injectable } from "@nestjs/common";
import {CreateUsuarioDto} from "../dto/create-usuario.dto";
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>,
    ) {}
        async create(dto: CreateUsuarioDto): Promise<UsuarioEntity> {
            const usuario = this.usuarioRepository.create({
                nome: dto.nome,
                email: dto.email,
                senha_Hash: dto.senha
            });
            return this.usuarioRepository.save(usuario);
        }
        async findByName(nome: string): Promise<UsuarioEntity[]> {

        const usuarios = await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
            }
        });

        if (usuarios.length === 0) {
            throw new HttpException('Usuário não encontrado', 404);
        }

        return usuarios;
    }

    async findByEmail(email: string): Promise<UsuarioEntity | null> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                email: email,
            }
        });

        if (!usuario) {
            throw new HttpException('Email não encontrado', 404);
        }

        return usuario;
    }

    async findById(id: string): Promise<UsuarioEntity | null> {

        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (!usuario) {
            throw new HttpException('Usuário não encontrado', 404);
        }

        return usuario;
    }
    async findAll(): Promise<UsuarioEntity[]> {
        return this.usuarioRepository.find();
    }

    async delete(id: string): Promise<void> {
        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (!usuario) {
            throw new HttpException('Usuário não encontrado', 404);
        }

        await this.usuarioRepository.delete(id);
    }

    async update(id: string, dto: CreateUsuarioDto): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (!usuario) {
            throw new HttpException('Usuário não encontrado', 404);
        }

        usuario.nome = dto.nome;
        usuario.email = dto.email;
        usuario.senha_Hash = dto.senha;

        return this.usuarioRepository.save(usuario);
    }
    
}