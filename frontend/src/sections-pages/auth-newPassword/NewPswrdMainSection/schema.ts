import * as yup from 'yup'
interface FormValues {
  new_password: string
  repeat_password: string
}

export const newPasswordInitialValues: FormValues = {
  new_password: '',
  repeat_password: '',
}
export const newPasswordValidationSchema = (t: (key: string) => string) =>
  yup.object({
    new_password: yup
      .string()
      .required(t('auth.validation.password.newPassword.requiredNewPassword'))
      .min(8, t('auth.validation.password.minLength')),
    repeat_password: yup
      .string()
      .required(t('auth.validation.password.newPassword.repeat'))
      .oneOf([yup.ref('new_password')], t('auth.validation.password.newPassword.doNotMatch')),
  })
