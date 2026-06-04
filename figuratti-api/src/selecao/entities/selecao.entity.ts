import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'tb_selecoes'})
export class SelecaoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column ()
    nome!: string;

    @Column({unique: true})
    codigoFifa!: string;

    @Column()
    bandeiraUrl!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    
}