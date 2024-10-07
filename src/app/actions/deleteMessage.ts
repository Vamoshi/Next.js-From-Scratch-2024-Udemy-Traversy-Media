"use server";

import { MessageDocument } from "@/models/IMessage";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId: Types.ObjectId | string) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const message: MessageDocument | null = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message does not exist");
  }

  if (message.recipient.toString() !== sessionUser.id) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/messages", "page");
};

export default deleteMessage;
