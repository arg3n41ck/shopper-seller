import React, { FC, useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { fetchMe } from '@/entities/user/model/slice'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const authClient = new AuthClient()

interface IFormErrors {
  [key: string]: string
}

interface IFormValues {
  old_password: string
  new_password: string
  repeat_password: string
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    old_password: yup.string().required('Обязательно брат'),
    new_password: yup.string().required('Обязательно брат').min(8, t('auth.validation.password.minLength')),
    repeat_password: yup
      .string()
      .required('Повтори пароль брат')
      .oneOf([yup.ref('new_password')], 'Не совпадает брат'),
  })

interface Props {
  open: boolean
  onClose: () => void
}

export const EditPasswordModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    repeat_password: false,
  })

  const formik = useFormik<IFormValues>({
    initialValues: {
      old_password: '',
      new_password: '',
      repeat_password: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ new_password, old_password }, { resetForm }) => {
      setIsLoading(true)
      try {
        await authClient.changePassword({ new_password, old_password })
        await dispatch(fetchMe())
        setIsLoading(false)
        onClose()
        resetForm()
      } catch (error: any) {
        setIsLoading(false)
        if (error.response && error.response.status === 400) {
          const { data } = error.response
          const formErrors: IFormErrors = {}

          if (data?.detail) {
            formErrors.old_password = 'Неверно введённый пароль'
          }

          formik.setErrors(formErrors)
        }
      }
    },
  })

  const handleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[46px] py-[42px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Измените ваш пароль</p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить ваш пароль в любое время чтобы хранить ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <TextField
                placeholder={t('Пароль')}
                error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                errorMessage={
                  formik.touched.old_password && formik.errors.old_password ? formik.errors.old_password : ''
                }
                value={formik.values.old_password}
                onChange={formik.handleChange}
                name="old_password"
                type={showPassword.old_password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.old_password,
                  onHide: () => handleShowPassword('old_password'),
                  onShow: () => handleShowPassword('old_password'),
                })}
              />

              <TextField
                placeholder={t('Новый пароль')}
                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                errorMessage={
                  formik.touched.new_password && formik.errors.new_password ? formik.errors.new_password : ''
                }
                value={formik.values.new_password}
                onChange={formik.handleChange}
                name="new_password"
                type={showPassword.new_password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.new_password,
                  onHide: () => handleShowPassword('new_password'),
                  onShow: () => handleShowPassword('new_password'),
                })}
              />

              <TextField
                placeholder={t('Подтвердите пароль')}
                error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
                errorMessage={
                  formik.touched.repeat_password && formik.errors.repeat_password ? formik.errors.repeat_password : ''
                }
                value={formik.values.repeat_password}
                onChange={formik.handleChange}
                name="repeat_password"
                type={showPassword.repeat_password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.repeat_password,
                  onHide: () => handleShowPassword('repeat_password'),
                  onShow: () => handleShowPassword('repeat_password'),
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
