import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'tb_usuarios'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role!: 'user' | 'admin';

    @Column({length: 255})
    nome!: string;
    
    @Column({unique: true, length: 150})
    email!: string;

    @Column()
    senha_hash!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}