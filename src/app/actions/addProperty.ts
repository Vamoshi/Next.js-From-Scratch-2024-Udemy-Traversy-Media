"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import { IProperty, Property } from "@/models";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addProperty(formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const getDataAsString = (key: string) => {
    const value = formData.get(key);
    if (!value) throw new Error(`Missing required field: ${key}`);
    return value as string;
  };

  const parseOptionalNumber = (key: string) => {
    const value = formData.get(key);
    return value ? +value : undefined;
  };

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter(
      (image): image is File => image instanceof File && image.name !== ""
    );

  const imageUrls = [];

  for (const imageFile of images) {
    // converts File to ArrayBuffer which is a low-level binary representation of file
    const imageBuffer = await imageFile.arrayBuffer();
    // ArrayBuffer is then converted to a Uint8Array (array of 8-bit unsigned integers) to manipulate bin data
    // then Uint8Array is converted into regular js array
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    // then convert to Node.js Buffer object which will allow efficient binary handling in Node.js
    const imageData = Buffer.from(imageArray);

    // detect file type dynamically
    const mimeType = imageFile.type; // imageFile.type contains the MIME type of the file
    // convert image to b64/ASCII characters
    const imageB64 = imageData.toString("base64");

    // Request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${imageB64}`,
      { folder: "propertypulse" }
    );

    imageUrls.push(result.secure_url);
  }

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
      nightly: parseOptionalNumber("rates.nightly"),
      weekly: parseOptionalNumber("rates.weekly"),
      monthly: parseOptionalNumber("rates.monthly"),
    },
    seller_info: {
      name: getDataAsString("seller_info.name"),
      email: getDataAsString("seller_info.email"),
      phone: getDataAsString("seller_info.phone"),
    },
    images: imageUrls,
  };

  console.log("====================================");
  console.log(propertyData);
  console.log("====================================");

  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}
