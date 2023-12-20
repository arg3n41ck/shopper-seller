import * as yup from 'yup'

export const resetPasswordValidationSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup.string().required(t('Введите почту')),
  })
