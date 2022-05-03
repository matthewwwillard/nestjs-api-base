import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    displayName:string;

    @IsNotEmpty()
    password:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsOptional()
    @IsString()
    phoneNumber:string;
}