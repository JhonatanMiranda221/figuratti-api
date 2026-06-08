import { IsEnum } from 'class-validator';

import { StatusColecao } from '../entities/colecao.entity';

export class UpdateColecaoDto {
  @IsEnum(StatusColecao)
  status!: StatusColecao;
}