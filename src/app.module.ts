import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './ modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as "mysql" | "mariadb" | "postgres" || 'mariadb',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities:[
        "dist/db/*.js"
      ],
      synchronize: process.env.DB_SYNC == 'true'
    }),

    UsersModule
  ],
})
export class AppModule { }
