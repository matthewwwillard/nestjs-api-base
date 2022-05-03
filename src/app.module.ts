import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './ modules/users/users.module';
import { TwilioModule } from './common/modules/twilio/twilio.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal:true
      }
    ),
    TypeOrmModule.forRoot(),
    TwilioModule,
    UsersModule
  ],
})
export class AppModule {}
