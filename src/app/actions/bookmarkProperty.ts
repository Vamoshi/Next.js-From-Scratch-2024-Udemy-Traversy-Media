"use server";

import connectDB from "@/config/database";
import { User, UserDocument } from "@/models";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId: Types.ObjectId) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser?.id) {
      throw new Error("User ID is required");
    }

    const { id: userID } = sessionUser;

    const user = (await User.findById(userID)) as UserDocument;
    let isBookmarked = user?.bookmarks.includes(propertyId);

    let message;

    console.log("====================================");
    console.log(user.bookmarks);
    console.log("====================================");

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      // user.bookmarks = user.bookmarks.filter((e) => e. !== propertyId);

      message = "Bookmark Removed";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark Added";
      isBookmarked = true;
    }

    await user.save();
    revalidatePath("/properties/saved", "page");

    return {
      message,
      isBookmarked,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default bookmarkProperty;
