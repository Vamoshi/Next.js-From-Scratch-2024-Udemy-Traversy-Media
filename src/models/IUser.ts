import { Document } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument
  extends Omit<IUser, "_id" | "bookmarks">,
    Document {
  _id: string;
  bookmarks: string[];
}
