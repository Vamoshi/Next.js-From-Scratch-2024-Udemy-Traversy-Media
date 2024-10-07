import { Document, Types } from "mongoose";

export type IMessage = {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  property: {
    _id: string;
    name: string;
  };
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type MessageDocument = Omit<
  IMessage,
  "_id" | "sender" | "recipient" | "property"
> &
  Document & {
    _id: Types.ObjectId;
    sender: Types.ObjectId;
    recipient: Types.ObjectId;
    property: Types.ObjectId;
  };
