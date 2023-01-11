import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constants';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(subscriber.email);

    if (existsSubscriber) {
      throw new BadRequestException(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }
}
