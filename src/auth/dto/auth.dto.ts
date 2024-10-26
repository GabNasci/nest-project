import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;
}