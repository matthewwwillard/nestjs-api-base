import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../../common/services/jwt.service";
import { Users } from "../../../db/Users";

@Injectable()
export class AuthTokenCheckMiddleware implements NestMiddleware {
    constructor(
        private jwt:JwtService
    ){}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('token');
        
        if(token == null)
            throw new HttpException('Invalid Access!', HttpStatus.UNAUTHORIZED);

        if(!this.jwt.verify(token))
            throw new HttpException('This Session is Invalid', HttpStatus.UNAUTHORIZED);

        res.locals.user = this.jwt.decode<Users>(token);

        next();
    }
}