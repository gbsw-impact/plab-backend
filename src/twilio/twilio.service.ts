import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TwilioConfigService } from './twilio-config.service';

@Injectable()
export class TwilioService {
  private readonly client: Twilio;
  private readonly twilioPhoneNumber: string = '+15189636426';

  constructor(private readonly twilioConfig: TwilioConfigService) {
    this.client = new Twilio(
      this.twilioConfig.accountSid,
      this.twilioConfig.authToken,
    );
    this.twilioPhoneNumber = this.twilioConfig.phoneNumber;
  }

  async sendSms(to: string, body: string) {
    await this.client.messages.create({
      body,
      from: this.twilioPhoneNumber,
      to,
    });
  }
}
