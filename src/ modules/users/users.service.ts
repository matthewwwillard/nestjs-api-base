import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { Users } from "../../db/Users";
import { CreateUserDto } from "./dtos/create-user.dto";
import { EditUserDto } from "./dtos/edit-user.dto";

@Injectable()
export class UsersService {

    constructor(
    ) { }

    public async createUser(userData: CreateUserDto) {
        try {
            let user: Users = Object.assign(new Users(), userData);

            await Users.save(user);

            return user.id;

        } catch (e) {
            return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async editUser(user: Users, userData: EditUserDto) {
        try {

            await Users.update({
                id: user.id
            }, { ...userData });

            return true;

        } catch (e) {
            return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}