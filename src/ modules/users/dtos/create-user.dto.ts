import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    displayName:string;

    @IsNotEmpty()
    password:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

}