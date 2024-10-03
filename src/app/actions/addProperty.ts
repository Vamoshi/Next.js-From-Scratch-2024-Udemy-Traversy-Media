"use server";

import connectDB from "@/config/database";
import { IProperty, Property } from "@/models";
import { getSessionUser } from "@/utils/getSessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addProperty(formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const getDataAsString = (key: string) => formData.get(key) as string;

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image instanceof File && image.name !== "")
    .map((image) => image instanceof File && image.name);

  const propertyData: IProperty = {
    owner: sessionUser.id,
    name: getDataAsString("name"),
    type: getDataAsString("type"),
    location: {
      street: getDataAsString("location.street"),
      city: getDataAsString("location.city"),
      state: getDataAsString("location.state"),
      zipcode: getDataAsString("location.zipcode"),
    },
    // putting + before a string number converts to number
    beds: +getDataAsString("beds"),
    baths: +getDataAsString("baths"),
    square_feet: +getDataAsString("square_feet"),
    amenities: amenities as string[],
    rates: {
      nightly: +getDataAsString("rates.nightly"),
      weekly: +getDataAsString("rates.weekly"),
      monthly: +getDataAsString("rates.monthly"),
    },
    seller_info: {
      name: getDataAsString("seller_info.name"),
      email: getDataAsString("seller_info.email"),
      phone: getDataAsString("seller_info.phone"),
    },
    images: images as string[],
  };

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}
