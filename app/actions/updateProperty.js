"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user isn't own this property");
  }
}

export default updateProperty;
