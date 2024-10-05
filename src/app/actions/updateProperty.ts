"use server";

import connectDB from "@/config/database";
import { IProperty, Property } from "@/models";
import { getDataAsString, parseOptionalNumber } from "@/utils/formatFormValues";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId: string, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const existingProperty = await Property.findById(propertyId);

  if (existingProperty.owner.toString() !== sessionUser.id) {
    throw new Error("Current user does not own this property");
  }

  const amenities = formData.getAll("amenities");

  const propertyData: Omit<IProperty, "images"> = {
    owner: sessionUser.id,
    name: getDataAsString(formData, "name"),
    type: getDataAsString(formData, "type"),
    location: {
      street: getDataAsString(formData, "location.street"),
      city: getDataAsString(formData, "location.city"),
      state: getDataAsString(formData, "location.state"),
      zipcode: getDataAsString(formData, "location.zipcode"),
    },
    // putting + before a string number converts to number
    beds: +getDataAsString(formData, "beds"),
    baths: +getDataAsString(formData, "baths"),
    square_feet: +getDataAsString(formData, "square_feet"),
    description: getDataAsString(formData, "description"),
    amenities: amenities as string[],
    rates: {
      nightly: parseOptionalNumber(formData, "rates.nightly"),
      weekly: parseOptionalNumber(formData, "rates.weekly"),
      monthly: parseOptionalNumber(formData, "rates.monthly"),
    },
    seller_info: {
      name: getDataAsString(formData, "seller_info.name"),
      email: getDataAsString(formData, "seller_info.email"),
      phone: getDataAsString(formData, "seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
