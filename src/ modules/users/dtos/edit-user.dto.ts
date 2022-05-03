import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class EditUserDto {
    @IsString()
    @IsNotEmpty()
    displayName:string;

    @IsOptional()
    password:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsOptional()
    @IsString()
    phoneNumber:string;
}