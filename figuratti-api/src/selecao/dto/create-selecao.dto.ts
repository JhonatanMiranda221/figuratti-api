import {IsString, IsNotEmpty, Length} from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateSelecaoDto {
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório" })
    @Transform(({ value }) => value.trim())
    nome!: string;

    @IsString()
    @IsNotEmpty({ message: "O código FIFA é obrigatório" })
    @Length(3, 3, { message: "O código FIFA deve conter exatamente 3 caracteres" })
    @Transform(({ value }) => value.trim().toUpperCase())
    codigoFifa!: string;

    @IsString()
    @IsNotEmpty({ message: "A URL da bandeira é obrigatória" })
    @Transform(({ value }) => value.trim())
    bandeiraUrl!: string;
}