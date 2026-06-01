import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional} from "class-validator";




export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsEmail({}, { message: "O email deve ser válido" })
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6, { message: "A senha deve conter pelo menos 6 caracteres" })
    @IsOptional()
    senha?: string;
}

