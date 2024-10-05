const getDataAsString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  if (!value) throw new Error(`Missing required field: ${key}`);
  return value as string;
};

const parseOptionalNumber = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return value ? +value : undefined;
};

export { getDataAsString, parseOptionalNumber };
