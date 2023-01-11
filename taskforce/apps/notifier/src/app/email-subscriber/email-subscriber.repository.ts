import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';
import { EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) { }

  public async create(entity: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(entity);
    return newEmailSubscriber.save();
  }

  public async delete(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel
      .findOne({ id })
      .exec();
  }

  public async update(id: string, entity: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, entity.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec()
  }


}
