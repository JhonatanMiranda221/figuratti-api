import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { FigurinhaEntity } from '../../figurinha/entities/figurinha.entity';

@Entity({name: 'tb_selecoes'})
export class SelecaoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
    type: 'varchar'
    })
    nome!: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    codigoFifa!: string;

    @Column({
        type: 'varchar'
    })
    bandeiraUrl!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(
        () => FigurinhaEntity,
        (figurinha) => figurinha.selecao
    )
    figurinhas!: FigurinhaEntity[];
    
}