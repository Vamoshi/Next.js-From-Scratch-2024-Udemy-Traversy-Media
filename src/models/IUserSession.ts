import { Session } from "next-auth";

export default interface IUserSession extends Session {
  id: string;
}
