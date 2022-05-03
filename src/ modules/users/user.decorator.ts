import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Users } from "../../db/Users";

export const User = createParamDecorator(

    (data:unknown, ctx:ExecutionContext)=>{
        const res = ctx.switchToHttp().getResponse();

        const user:Users = res.locals.user;

        if(user == null)
            throw new HttpException('Invalid Access to User!', HttpStatus.BAD_REQUEST);

        return user;
    }
)