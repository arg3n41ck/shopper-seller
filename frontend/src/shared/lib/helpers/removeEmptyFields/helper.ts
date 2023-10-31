export function removeEmptyFields<T>(obj: T, preserveFields: string[] = []): T {
  if (Array.isArray(obj)) {
    return obj.filter((v) => Object.keys(v).length !== 0) as unknown as T
  }
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  // eslint-disable-next-line
  const newObj: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (preserveFields.includes(key) || Object.keys(value).length !== 0) {
      newObj[key] = removeEmptyFields(value, preserveFields)
    }
  }
  return newObj
}
