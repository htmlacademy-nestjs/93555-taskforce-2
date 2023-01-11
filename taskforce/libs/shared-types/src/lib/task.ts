import { Tag } from './tag';
import { Comment } from './comment';

export type TaskStatus = "CREATED" | "CANCELLED" | "PENDING" | "DONE" | "FAILED"

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  status: TaskStatus;
  price: number;
  image: string;
  address: string;
  tags: Tag[];
  userId: string;
  comments: Comment[];
  createdAt?: Date;
}
