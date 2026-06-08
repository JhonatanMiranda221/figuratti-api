import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { FigurinhaEntity } from '../../figurinha/entities/figurinha.entity';

export enum StatusColecao {
  TENHO = 'TENHO',
  FALTA = 'FALTA',
  REPETIDA = 'REPETIDA',
}

@Entity('tb_colecoes_figurinhas')
@Unique(['usuario', 'figurinha']) // evita duplicidade por par usuário+figurinha
export class ColecaoFigurinhaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UsuarioEntity, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => FigurinhaEntity, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'figurinha_id' })
  figurinha!: FigurinhaEntity;

  @Column({
    type: 'enum',
    enum: StatusColecao,
    default: StatusColecao.FALTA,
  })
  status!: StatusColecao;

  @Column({ type: 'int', default: 1 })
  quantidade!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}