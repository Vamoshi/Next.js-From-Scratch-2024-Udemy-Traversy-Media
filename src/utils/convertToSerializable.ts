const convertToSerializable = (leanDocument: unknown) =>
  JSON.parse(JSON.stringify(leanDocument));

export default convertToSerializable;
