import { Session } from "next-auth";

export interface IUserSession extends Session {
  id: string;
}
