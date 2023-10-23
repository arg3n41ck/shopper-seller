import * as yup from 'yup'

export const newPasswordInitialValues = {
  password: '',
  re_password: '',
}
export const newPasswordValidationSchema = (t: (key: string) => string) =>
  yup.object({
    password: yup
      .string()
      .required(t('auth.validation.password.newPassword.requiredNewPassword'))
      .min(8, t('auth.validation.password.minLength')),
    re_password: yup
      .string()
      .required(t('auth.validation.password.newPassword.repeat'))
      .oneOf([yup.ref('new_password')], t('auth.validation.password.newPassword.doNotMatch')),
  })
