import { Types } from "mongoose";

export function convertToSerializableObject(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (obj instanceof Types.ObjectId) {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToSerializableObject(item));
  }

  const serializableObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      serializableObj[key] = convertToSerializableObject(obj[key]);
    }
  }

  return serializableObj;
}
