import { Document, Types } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = Omit<IUser, "_id" | "bookmarks"> &
  Document & {
    _id: Types.ObjectId;
    bookmarks: Types.Array<Types.ObjectId>;
  };
