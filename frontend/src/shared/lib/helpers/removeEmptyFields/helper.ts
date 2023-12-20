export function removeEmptyFields<T extends Record<string, unknown>>(obj: T, preserveFields: string[] = []): T | null {
  if (Array.isArray(obj)) {
    const filteredArray = obj.filter((item) => {
      if (typeof item === 'object' && item !== null) {
        return Object.keys(item).length > 0 || (Array.isArray(item) && item.length > 0)
      }
      return true
    })

    return filteredArray.length > 0 ? (filteredArray as unknown as T) : null
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const newObj: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (preserveFields.includes(key)) {
      newObj[key] = value
      continue
    }

    if (value !== null && typeof value === 'object') {
      const cleanedValue = removeEmptyFields(value as Record<string, unknown>, preserveFields)
      if (
        cleanedValue !== null &&
        (Object.keys(cleanedValue).length !== 0 || (Array.isArray(cleanedValue) && cleanedValue.length > 0))
      ) {
        newObj[key] = cleanedValue
      }
    } else if (value !== undefined && value !== '') {
      newObj[key] = value
    }
  }

  return Object.keys(newObj).length > 0 ? (newObj as T) : null
}
