"use server";

import cloudinary from "@/config/cloudinary";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required.");
  }
  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property Not Found.");

  //Verify Ownership

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //Delete images on Cloudinary
  if (publicIds > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("rent-app/" + publicId);
    }
  }

  await property.deleteOne().map(convertToSerializableObject);

  revalidatePath("/", "layout");
};

export default deleteProperty;
