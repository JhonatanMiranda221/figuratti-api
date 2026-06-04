import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FigurinhaEntity } from '../entities/figurinha.entity';
import { CreateFigurinhaDto } from '../dto/create-figurinha.dto';
import { UpdateFigurinhaDto } from '../dto/update-figurinha.dto';

@Injectable()
export class FigurinhaService {
  constructor(
    @InjectRepository(FigurinhaEntity)
    private figurinhaRepository: Repository<FigurinhaEntity>,
  ) {}

  async create(
    dto: CreateFigurinhaDto,
  ): Promise<FigurinhaEntity> {
    const figurinha = this.figurinhaRepository.create(dto);

    return this.figurinhaRepository.save(figurinha);
  }

  async findAll(): Promise<FigurinhaEntity[]> {
    return this.figurinhaRepository.find();
  }

  async findById(
    id: number,
  ): Promise<FigurinhaEntity> {
    const figurinha =
      await this.figurinhaRepository.findOneBy({ id });

    if (!figurinha) {
      throw new NotFoundException(
        'Figurinha não encontrada',
      );
    }

    return figurinha;
  }

  async update(
    id: number,
    dto: UpdateFigurinhaDto,
  ): Promise<FigurinhaEntity> {
    const figurinha =
      await this.figurinhaRepository.findOneBy({ id });

    if (!figurinha) {
      throw new NotFoundException(
        'Figurinha não encontrada',
      );
    }

    Object.assign(figurinha, dto);

    return this.figurinhaRepository.save(figurinha);
  }

  async delete(id: number): Promise<void> {
    const result =
      await this.figurinhaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        'Figurinha não encontrada',
      );
    }
  }
}