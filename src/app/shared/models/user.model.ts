import { PositionEnum } from "../enums";

export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: PositionEnum;
  password: string;
}
