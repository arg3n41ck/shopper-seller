import * as yup from 'yup'

export const signUpValidationSchema = () =>
  yup.object({
    shop_name: yup.string().required('Введите название магазина'),
    phone_number: yup.string().required('Введите номер телефона'),
    email: yup.string().email('Неверный формат электронной почты').required('Введите электронную почту'),
    password: yup.string().min(8, 'Пароль должен содержать минимум 8 символов').required('Введите пароль'),
    repeat_password: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Повторите пароль'),
    code: yup.string().required('Введите код подтверждения'),
  })
