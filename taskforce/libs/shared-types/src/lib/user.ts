export enum UserRole {
  Customer = 'customer',
  Performer = 'performer',
}

export enum UserCity {
  Moscow = 'Москва',
  SaintPetersburg = 'Санкт-Петербург',
  Vladivostok = 'Владивосток'
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  birthDate: Date;
  avatar?: string;
  info?: string;
  passwordHash: string;
  city: UserCity;
  role: UserRole;

  publishedTasks?: number,
  newTasks?: number,

  specializations?: string[];
  rating?: number;
  rank?: number;
  completedTasks?: number;
  failedTasks?: number;
}
