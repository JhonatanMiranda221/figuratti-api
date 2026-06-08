import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ColecaoFigurinhaEntity,
  StatusColecao,
} from '../entities/colecao.entity';

import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { FigurinhaEntity } from '../../figurinha/entities/figurinha.entity';

import { UpdateColecaoDto } from '../dto/update-colecao.dto';

@Injectable()
export class ColecaoService {
  constructor(
    @InjectRepository(ColecaoFigurinhaEntity)
    private readonly colecaoRepository: Repository<ColecaoFigurinhaEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(FigurinhaEntity)
    private readonly figurinhaRepository: Repository<FigurinhaEntity>,
  ) {}

  async atualizarStatus(
    usuarioId: string,
    figurinhaId: number,
    dto: UpdateColecaoDto,
  ): Promise<ColecaoFigurinhaEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const figurinha = await this.figurinhaRepository.findOne({
      where: { id: figurinhaId },
    });

    if (!figurinha) {
      throw new NotFoundException('Figurinha não encontrada');
    }

    let colecao = await this.colecaoRepository.findOne({
      where: {
        usuario: { id: usuarioId },
        figurinha: { id: figurinhaId },
      },
      relations: {
        usuario: true,
        figurinha: true,
      },
    });

    if (!colecao) {
      colecao = this.colecaoRepository.create({
        usuario,
        figurinha,
        status: dto.status,
        quantidade: dto.status === StatusColecao.REPETIDA ? 2 : 1,
      });
    } else {
      colecao.status = dto.status;

      if (dto.status === StatusColecao.FALTA) {
        colecao.quantidade = 0;
      }

      if (dto.status === StatusColecao.TENHO) {
        colecao.quantidade = 1;
      }

      if (dto.status === StatusColecao.REPETIDA) {
        colecao.quantidade = Math.max(2, colecao.quantidade);
      }
    }

    return this.colecaoRepository.save(colecao);
  }

  async listarColecao(
    usuarioId: string,
  ): Promise<ColecaoFigurinhaEntity[]> {
    return this.colecaoRepository.find({
      where: {
        usuario: {
          id: usuarioId,
        },
      },
      relations: {
        figurinha: true,
      },
      order: {
        figurinha: {
          numero: 'ASC',
        },
      },
    });
  }

  async listarRepetidas(
    usuarioId: string,
  ): Promise<ColecaoFigurinhaEntity[]> {
    return this.colecaoRepository.find({
      where: {
        usuario: {
          id: usuarioId,
        },
        status: StatusColecao.REPETIDA,
      },
      relations: {
        figurinha: true,
      },
    });
  }

  async obterEstatisticas(usuarioId: string) {
    const totalFigurinhas = await this.figurinhaRepository.count();

    const tenho = await this.colecaoRepository.count({
      where: {
        usuario: { id: usuarioId },
        status: StatusColecao.TENHO,
      },
    });

    const repetidas = await this.colecaoRepository.count({
      where: {
        usuario: { id: usuarioId },
        status: StatusColecao.REPETIDA,
      },
    });

    const faltam = totalFigurinhas - tenho;

    const percentual =
      totalFigurinhas > 0
        ? Number(((tenho / totalFigurinhas) * 100).toFixed(2))
        : 0;

    return {
      total: totalFigurinhas,
      tenho,
      faltam,
      repetidas,
      percentual,
    };
  }
}