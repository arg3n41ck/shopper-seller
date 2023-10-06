export const setLocalStorageValues = (values: Record<string, any>) => {
  Object.entries(values).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const removeFieldsFromLocalStorage = (fields: string[]) => {
  return fields.forEach((field) => {
    localStorage.removeItem(field);
  });
};

export const getLocalStorageValues = (keys: string[]): Record<string, any> => {
  return keys.reduce((values: Record<string, any>, key: string) => {
    values[key] = localStorage.getItem(key);
    return values;
  }, {});
};
