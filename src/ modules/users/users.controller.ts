import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { Users } from "../../db/Users";
import { CreateUserDto } from "./dtos/create-user.dto";
import { EditUserDto } from "./dtos/edit-user.dto";
import { User } from "./user.decorator";
import { UsersService } from "./users.service";

@Controller('/api/v1/users')
export class UsersController {
    constructor(
        private service:UsersService,
    ){}

    @Post('')
    createUser(@Body() userData:CreateUserDto)
    {
        return this.service.createUser(userData);
    }

    @Put('')
    updateUser(@User() user:Users, @Body() userData:EditUserDto)
    {
        return this.service.editUser(user, userData);
    }

}