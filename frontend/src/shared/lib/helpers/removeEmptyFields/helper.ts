export function removeEmptyFields<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.filter((v) => Object.keys(v).length !== 0) as unknown as T
  }
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const newObj: any = {}
  for (const [key, value] of Object.entries(obj)) {
    const filteredValue = removeEmptyFields(value)
    if (Object.keys(filteredValue).length !== 0) {
      newObj[key] = filteredValue
    }
  }
  return newObj
}
