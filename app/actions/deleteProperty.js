"use server";

import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

const deleteProperty = async (propertyId) => {
  const sessionUser = await getSessionUser;

  if (!getSessionUser || sessionUser.userId) {
    throw new Error("User Id is required.");
  }
  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property Not Found.");

  //Verify Ownership

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }
};

export default deleteProperty;
