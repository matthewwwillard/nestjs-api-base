import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Users } from "../../../db/Users";
import { TwilioBaseService } from "./twilio.base.service";
import * as QRCode from 'qrcode';

export enum TWILIO_VERIFY_CHANNELS {
    SMS = "sms",
    EMAIL = "email",
    VOICE = "call"
}

@Injectable()
export class TwilioVerifyService extends TwilioBaseService {

    private sid: string = null;

    constructor(
        config: ConfigService
    ) {
        super(config);
        this.sid = this.config.get('TWILIO_VERIFY_SID')
    }

    public async registerTOTP(user: Users) {
        try {
            let factor = await this.twilio.verify.services(this.sid)
                .entities(user.id)
                .newFactors
                .create(
                    {
                        friendlyName: 'Clean NFTs 2Auth',
                        factorType: 'totp'
                    }
                );

            const qr = await QRCode.toDataURL(factor.binding.uri);

            await Users.update(
                {
                    id: user.id
                },
                {
                    authId: factor.sid
                }
            );

            return { message: '', failed: false, qr, secret: factor.binding.secret };
        }
        catch (e) {
            return { message: e.message, failed: true, qr: null, secret: null }
        }
    }
    public async verifyTOTP(user: Users, code: string) {
        try {
            let verify = await this.twilio.verify.services(this.sid)
                .entities(user.id)
                .factors(user.authId)
                .update({ authPayload: code });

            return {
                message: null,
                verified: verify.status == 'verified'
            }

        } catch (e) {
            return { message: e.message, verified: false };
        }
    }
    public async verifyTOTPCode(user: Users, code: string) {
        try {
            let verify = await this.twilio.verify.services(this.sid)
                .entities(user.id)
                .challenges
                .create(
                    {
                        authPayload: code,
                        factorSid: user.authId
                    }
                );

            return verify.status === 'approved';
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    public async sendCode(user: Users, channel: TWILIO_VERIFY_CHANNELS) {
        try {

            const sendData = {
                to: (channel == TWILIO_VERIFY_CHANNELS.SMS || channel == TWILIO_VERIFY_CHANNELS.VOICE) ? `+1${user.phoneNumber}` : user.email,
                channel: channel
            }

            await this.twilio.verify.services(this.sid)
                .verifications
                .create(sendData);

            return { message: '', failed: false };

        } catch (e) {
            return { message: e.message, failed: true };
        }
    }
    public async verifyChannelCode(user: Users, code: string, channel: TWILIO_VERIFY_CHANNELS) {
        try {
            const sendData = {
                to: (channel == TWILIO_VERIFY_CHANNELS.SMS || channel == TWILIO_VERIFY_CHANNELS.VOICE) ? `+1${user.phoneNumber}` : user.email,
                code: code,
                channel: channel
            }

            const status = await this.twilio.verify.services(this.sid)
                .verificationChecks
                .create(sendData);

            return { message: '', failed: !status.valid }
        } catch (e) {
            console.log(e);
            return { message: e.message, failed: true };
        }
    }
}