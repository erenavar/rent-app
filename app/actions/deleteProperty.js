"use server";

import { getSessionUser } from "@/utils/getSessionUser";

const deleteProperty = async (propertyId) => {
  const sessionUser = await getSessionUser;

  if (!getSessionUser || sessionUser.userId) {
    throw new Error("User Id is required.");
  }
  const { userId } = sessionUser;
};

export default deleteProperty;
