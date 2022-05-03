import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TwilioVerifyService, TWILIO_VERIFY_CHANNELS } from "../../common/modules/twilio/twilio.verify.service";
import { Users } from "../../db/Users";

@Injectable()
export class AuthService {

    constructor(
        private twilioVerifyService:TwilioVerifyService
    ){}

    public async verifySend(user:Users, channel:TWILIO_VERIFY_CHANNELS) {
        try {
            let results = await this.twilioVerifyService.sendCode(user, channel);

            return results;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async verifySentCode(user:Users, code:string, channel:TWILIO_VERIFY_CHANNELS)
    {
        try {
            let results = await this.twilioVerifyService.verifyChannelCode(user, code, channel);
            return results;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async createTOTP(user:Users)
    {
        try {
            return await this.twilioVerifyService.registerTOTP(user);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async verifyCreateTOTP(user:Users, code:string)
    {
        try {
            return await this.twilioVerifyService.verifyTOTP(user, code);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async verifyTOTP(user:Users, code:string)
    {
        try {
            return await this.twilioVerifyService.verifyTOTPCode(user, code);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}