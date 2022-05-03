import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService
{
    constructor(
        private config:ConfigService
    ) {}

    public verify(token:string) : boolean
    {
        return jwt.verify(token, this.config.get('JWT_SECRET'));
    }
    public decode<T>(token:string) : T  {
        return jwt.decode(token)['data'] as T;
    }
    public create(data:any) {
        return jwt.sign({data:data}, this.config.get('JWT_SECRET'), {expiresIn:'1 day'});
    }
}