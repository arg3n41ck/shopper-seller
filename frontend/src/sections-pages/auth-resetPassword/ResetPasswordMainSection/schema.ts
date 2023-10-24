import * as yup from 'yup'

export const resetPasswordValidationSchema = (t: (key: string) => string) =>
  yup.object({
    phone_number: yup.string().required(t('Некорректный номер телефона')),
  })
