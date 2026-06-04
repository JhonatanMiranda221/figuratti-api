import { PartialType } from '@nestjs/mapped-types';
import { CreateSelecaoDto } from './create-selecao.dto';

export class UpdateSelecaoDto extends PartialType(
  CreateSelecaoDto,
) {}