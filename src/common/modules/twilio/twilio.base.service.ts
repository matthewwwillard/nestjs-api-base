import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";

export class TwilioBaseService {
    public twilio:Twilio = null;
    
    constructor(
        public config:ConfigService
    ){
        this.twilio = new Twilio(this.config.get('TWILIO_SID'), this.config.get('TWILIO_TOKEN'));
    }
}