import { PartialType } from '@nestjs/mapped-types';
import { CreateFigurinhaDto } from './create-figurinha.dto';

export class UpdateFigurinhaDto extends PartialType(
  CreateFigurinhaDto,
) {}