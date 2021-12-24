import { StatusEnum } from "../enums";

export class TaskModel {
  id: number;
  title: string;
  description: string;
  status: StatusEnum;
  duration: number;
  employeeId: number;
  projectId: number;
}
