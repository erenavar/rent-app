export function convertToSerializableObject(leanDocDocument) {
  for (const key of Object.keys(leanDocDocument)) {
    if (leanDocDocument[key].toJson && leanDocDocument[key].toString()) {
      leanDocument[key] = leanDocDocument[key].toString();
    }
  }
  return leanDocDocument;
}
