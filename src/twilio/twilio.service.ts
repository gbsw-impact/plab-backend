import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private readonly client: Twilio;
  private readonly twilioPhoneNumber: string = '+15189636426';

  constructor() {
    this.client = new Twilio(
      'ACd1fcb53115ff003da47da1aabe6fd0aa',
      '543505e024dc22b2dd4ea3e489bfc13c',
    );
  }

  async sendSms(to: string, body: string) {
    await this.client.messages.create({
      body,
      from: this.twilioPhoneNumber,
      to,
    });
  }
}
