import { IsString, IsNotEmpty, IsEmail,IsOptional, MinLength} from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório" })
    nome!: string;

    @IsEmail({}, { message: "O email deve ser válido" })
    @IsNotEmpty({ message: "O email é obrigatório" })
    email!: string;

    @IsString()
    @MinLength(6, { message: "A senha deve conter pelo menos 6 caracteres" })
    @IsNotEmpty({ message: "A senha é obrigatória" })
    senha!: string;
}