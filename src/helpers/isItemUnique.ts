export const isItemUnique = <T extends Record<string, any>>(
  array: T[],
  value: string,
  key: string = "title"
): boolean => {
  return !array.some((item) => item[key].toLowerCase() === value.toLowerCase());
};
