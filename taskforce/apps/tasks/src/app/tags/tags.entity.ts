import { Tag } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class TagsEntity implements Entity<Tag> {
  public id: number;
  public title: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.title = entity.title;
    this.id = entity.id;
  }

  public toObject(): Tag {
    return {
      id: this.id,
      title: this.title
    };
  }
}
