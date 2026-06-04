import {Injectable, ConflictException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SelecaoEntity} from "../entities/selecao.entity";
import {CreateSelecaoDto} from "../dto/create-selecao.dto";
import { UpdateSelecaoDto } from '../dto/update-selecao.dto';


@Injectable()
export class SelecaoService {
    constructor(
        @InjectRepository(SelecaoEntity)
        private readonly selecaoRepository: Repository<SelecaoEntity>,
    ) {}
    
    async create(dto: CreateSelecaoDto): Promise<SelecaoEntity> {
    const selecaoExistente =
        await this.selecaoRepository.findOne({
            where: {
                codigoFifa: dto.codigoFifa,
            },
        });

    if (selecaoExistente) {
        throw new ConflictException("Seleção já cadastrada");
    }

    const selecao = this.selecaoRepository.create(dto);

    return this.selecaoRepository.save(selecao);
}
    async findAll(): Promise<SelecaoEntity[]> {
        return this.selecaoRepository.find();
    }

    async findById(id: number): Promise<SelecaoEntity> {
    const selecao = await this.selecaoRepository.findOneBy({ id });

    if (!selecao) {
        throw new NotFoundException('Seleção não encontrada');
    }

    return selecao;
}

    async delete(id: number): Promise<void> {
    const selecao = await this.findById(id);

    await this.selecaoRepository.remove(selecao);
}

    async update(id: number, dto: UpdateSelecaoDto): Promise<SelecaoEntity> {
        const selecao = await this.selecaoRepository.findOneBy({ id });

        if (!selecao) {
            throw new NotFoundException("Seleção não encontrada");
        }

        Object.assign(selecao, dto);

        return this.selecaoRepository.save(selecao);
    }
        
}
