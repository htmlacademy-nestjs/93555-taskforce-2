import { TaskStatus } from "@taskforce/shared-types";

export class CreateTaskDTO {
  public title: string;
  public description: string;
  public categoryId: number;
  public status: TaskStatus;
  public price: number;
  public image: string;
  public address: string;
  public tags: number[];
  public userId: string;
}
