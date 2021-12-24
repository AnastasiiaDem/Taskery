import { StatusEnum } from "../enums";

export class ProjectModel {
  id: number;
  projectName: string;
  description: string;
  status: StatusEnum;
}
