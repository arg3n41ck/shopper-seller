import React, { FC, useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { setLocalStorageValues } from '@/shared/lib/hooks/useLocalStorage'
import { fetchMe } from '@/entities/user/model/slice'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const authClient = new AuthClient()

interface IFormValues {
  password: string
  email: string
  repeat_email: string
}

interface IFormErrors {
  [key: string]: string
}

interface Props {
  open: boolean
  onClose: () => void
}

type ErrorMessages = {
  email?: string
  password?: string
}

const errorMessages = new Map<number, ErrorMessages>([
  [
    400,
    {
      email: 'Введенный электронный адрес уже зарегистрирован',
      password: 'Неверно введённый пароль',
    },
  ],
  [
    422,
    {
      email: 'Введенный электронный адрес не является действительным',
    },
  ],
])

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    password: yup.string().required('Обязательно брат'),
    email: yup.string().email('Неправильно брат').required('Обязательно брат'),
    repeat_email: yup
      .string()
      .required('Повтори Эл почту брат')
      .oneOf([yup.ref('email')], 'Не совпадает брат'),
  })

interface Props {
  open: boolean
  onClose: () => void
}

export const EditEmailModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik<IFormValues>({
    initialValues: {
      password: '',
      email: '',
      repeat_email: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ email, password }, { resetForm }) => {
      setIsLoading(true)
      try {
        const changeEmailResponse = await authClient.changeEmail({
          email,
          password,
        })

        setLocalStorageValues({
          access_token: changeEmailResponse.access_token,
          refresh_token: changeEmailResponse.refresh_token,
        })

        await dispatch(fetchMe())
        setIsLoading(false)
        onClose()
        resetForm()
      } catch (error: any) {
        setIsLoading(false)
        if (error) {
          const response = error.response
          const formErrors: IFormErrors = {}

          switch (response.status) {
            case 400:
              const errorFields400 = errorMessages.get(400)
              if (response.data.detail.includes('Email')) {
                formErrors.email = 'Введеная Эл Почта уже зарегистрирована'
                toast.error(errorFields400?.email)
                return
              }
              formErrors.password = 'Неверно введённый пароль'
              toast.error(errorFields400?.password)
              break

            case 422:
              const errorFields422 = errorMessages.get(422)
              formErrors.email = t('auth.validation.email.invalid')
              formErrors.repeat_email = t('auth.validation.email.invalid')
              toast.error(errorFields422?.email)
              break

            default:
              break
          }

          formik.setErrors(formErrors)
        }
      }
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[42px] py-[46px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Измените вашу эл. почту</p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить вашу эл. почту в любое время чтобы хранить ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <TextField
                placeholder={t('Новая Эл. Почта')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
              />

              <TextField
                placeholder={t('Подтвердите эл. почту')}
                error={formik.touched.repeat_email && Boolean(formik.errors.repeat_email)}
                errorMessage={
                  formik.touched.repeat_email && formik.errors.repeat_email ? formik.errors.repeat_email : ''
                }
                value={formik.values.repeat_email}
                onChange={formik.handleChange}
                name="repeat_email"
              />

              <TextField
                placeholder={t('Пароль')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword,
                  onHide: () => setShowPassword(false),
                  onShow: () => setShowPassword(true),
                })}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant={BUTTON_STYLES.primaryCta}>
              <div className="flex items-center gap-[10px]">
                Сохранить
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
