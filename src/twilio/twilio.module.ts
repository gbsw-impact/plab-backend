// twilio.module.ts
import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioConfigService } from './twilio-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TwilioService, TwilioConfigService],
})
export class TwilioModule {}
