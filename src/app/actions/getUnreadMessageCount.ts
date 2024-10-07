"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const getUnreadMessageCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const count = await Message.countDocuments({
    recipient: sessionUser.id,
    read: false,
  });

  return { count };
};

export default getUnreadMessageCount;
