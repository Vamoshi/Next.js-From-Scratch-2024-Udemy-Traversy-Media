"use server";

import connectDB from "@/config/database";
import { MessageDocument } from "@/models/IMessage";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId: string | Types.ObjectId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  console.log("====================================");
  console.log(messageId);
  console.log("====================================");
  const message: MessageDocument = (await Message.findById(
    messageId
  )) as MessageDocument;

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.recipient.toString() !== sessionUser.id) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
};

export default markMessageAsRead;
