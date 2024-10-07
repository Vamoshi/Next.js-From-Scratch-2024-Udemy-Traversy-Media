import { Document, Types } from "mongoose";

export type IMessage = {
  _id: string;
  sender: string;
  recipient: string;
  property: string;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
