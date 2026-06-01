import { IsString, IsNotEmpty, IsEmail, MinLength} from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "O email é obrigatório" })
    @IsEmail({}, { message: "O email deve ser válido" })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: "A senha é obrigatória" })
    senha!: string;
}