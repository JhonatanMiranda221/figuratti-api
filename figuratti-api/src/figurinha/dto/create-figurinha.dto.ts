import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFigurinhaDto {
  @IsNumber()
  @IsNotEmpty()
  numero!: number;

  @IsString()
  @IsNotEmpty()
  nomeJogador!: string;

  @IsString()
  @IsNotEmpty()
  posicao!: string;

  @IsBoolean()
  especial!: boolean;

  @IsOptional()
  @IsString()
  categoria?: string;
}