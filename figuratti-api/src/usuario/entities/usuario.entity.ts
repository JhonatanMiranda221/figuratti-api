import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'tb_usuarios'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({length: 255})
    nome!: string;
    @Column({unique: true, length: 150})
    email!: string;

    @Column()
    senha_Hash!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}