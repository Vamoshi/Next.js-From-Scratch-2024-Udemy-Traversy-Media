"use server";

import connectDB from "@/config/database";
import { MessageDocument } from "@/models/IMessage";
import Message from "@/models/Message";
import { getDataAsString } from "@/utils/formatFormValues";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function addMessage(_: unknown, formData: unknown) {
  const getFormDataAsString = (field: string) =>
    getDataAsString(formData as FormData, field);

  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const recipient = getFormDataAsString("recipient");

  if (sessionUser.id === recipient) {
    return { error: "You cannot send a message to yourself" };
  }

  const newMessage: MessageDocument = new Message({
    sender: sessionUser.id,
    recipient,
    property: getFormDataAsString("property"),
    name: getFormDataAsString("name"),
    email: getFormDataAsString("email"),
    phone: getFormDataAsString("phone"),
    body: getFormDataAsString("body"),
  });

  await newMessage.save();

  return { submitted: true };
}
