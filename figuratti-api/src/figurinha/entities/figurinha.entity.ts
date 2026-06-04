import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_figurinhas' })
export class FigurinhaEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    numero!: number;

    @Column()
    nomeJogador!: string;

    @Column()
    posicao!: string;

    @Column({
        default: false,
    })
    especial!: boolean;

    @Column({
        nullable: true,
    })
    categoria!: string;

    @CreateDateColumn()
        createdAt!: Date;
    
    @UpdateDateColumn()
        updatedAt!: Date;
    
}