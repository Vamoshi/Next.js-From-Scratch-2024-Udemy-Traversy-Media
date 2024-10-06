"use server";

import connectDB from "@/config/database";
import { User, UserDocument } from "@/models";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";

const checkBookmarkStatus = async (
  propertyId: Types.ObjectId
): Promise<{ error?: string; isBookmarked?: boolean }> => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser?.id) {
      return { error: "You need to be logged in to bookmark properties" };
    }

    const { id: userID } = sessionUser;

    const user = (await User.findById(userID)) as UserDocument;
    return { isBookmarked: user?.bookmarks.includes(propertyId) || false };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export default checkBookmarkStatus;
