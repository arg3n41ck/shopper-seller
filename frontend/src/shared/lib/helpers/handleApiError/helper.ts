import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type ErrorResponse = {
  [key: string]: string | ErrorResponse
}

export const handleApiError = (error: AxiosError<ErrorResponse>) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data
    handleNestedError(errorData)
  } else {
    toast.error('Произошла ошибка')
  }
}

const handleNestedError = (errorData: ErrorResponse) => {
  const keys = Object.keys(errorData)
  const firstKey = keys[0]
  const value = errorData[firstKey]

  if (typeof value === 'string') {
    toast.error(value)
  } else if (typeof value === 'object') {
    handleNestedError(value)
  }
}
