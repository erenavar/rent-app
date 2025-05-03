import { Types } from "mongoose";

export function convertToSerializableObject(obj, visited = new Set()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (visited.has(obj)) {
    return "[Circular]";
  }

  visited.add(obj);

  if (obj instanceof Date) {
    visited.delete(obj);
    return obj.toISOString();
  }

  if (obj instanceof Types.ObjectId) {
    visited.delete(obj);
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    const serializableArray = obj.map((item) =>
      convertToSerializableObject(item, visited)
    );

    visited.delete(obj);
    return serializableArray;
  }

  const serializableObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      serializableObj[key] = convertToSerializableObject(obj[key], visited);
    }
  }

  visited.delete(obj);

  return serializableObj;
}
