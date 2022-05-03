import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { Users } from "../../db/Users";
import { CreateUserDto } from "./dtos/create-user.dto";
import { EditUserDto } from "./dtos/edit-user.dto";

@Injectable()
export class UsersService {

    constructor(
    ){}

    public async createUser(userData:CreateUserDto)
    {
        try {
            let user:Users = Object.assign(new Users(), userData);

            await getConnection().transaction(async (m)=>{
                await m.save(Users, user);
            });

            return user.id;

        } catch (e) {
            return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async editUser(user:Users, userData:EditUserDto)
    {
        try {
            await getConnection().transaction(async (m)=>{
                await m.update(Users, {
                    id:user.id
                }, {...userData});
            });

            return true;

        } catch (e) {
            return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
}