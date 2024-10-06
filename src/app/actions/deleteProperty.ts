"use server";

import cloudinary from "@/config/cloudinary";
import { Property } from "@/models";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: Types.ObjectId) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const { id: userId } = sessionUser;

  const property = await Property.findById(propertyId);

  //   Check if exists
  if (!property) {
    throw new Error("Property not found");
  }

  //   check if owner is the one deleting the property
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  //   get public image ids from public url
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts[parts.length - 1].split(".")[0];
  });

  //   delete images from cloudinary
  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy("propertyPulse/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
};

export default deleteProperty;
