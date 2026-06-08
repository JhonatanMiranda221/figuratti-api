import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SelecaoEntity } from "../../selecao/entities/selecao.entity";

@Entity({ name: 'tb_figurinhas' })
export class FigurinhaEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    numero!: number;

    @Column({
    type: 'varchar'
    })
    nomeJogador!: string;

    @Column({
        type: 'varchar'
    })
    posicao!: string;

    @Column({
        default: false,
    })
    especial!: boolean;

    @Column({
    type: 'varchar',
    nullable: true,
    })
    categoria!: string | null;
    @CreateDateColumn()
        createdAt!: Date;
    
    @UpdateDateColumn()
        updatedAt!: Date;
        
        @ManyToOne(
            () => SelecaoEntity,
            (selecao) => selecao.figurinhas,
            { nullable: true }
            )
            @JoinColumn({
            name: 'selecao_id',
            })
            selecao!: SelecaoEntity;
    
}