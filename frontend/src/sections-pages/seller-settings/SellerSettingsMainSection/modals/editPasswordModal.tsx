import React, { FC, useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
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
import { $apiAccountsApi } from '@/shared/api'

interface IFormErrors {
  [key: string]: string
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    current_password: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле').min(8, t('auth.validation.password.minLength')),
    re_password: yup
      .string()
      .required('Повторите пароль')
      .oneOf([yup.ref('password')], 'Пароль не совпадает'),
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
    current_password: false,
    password: false,
    re_password: false,
  })

  const formik = useFormik({
    initialValues: {
      current_password: '',
      password: '',
      re_password: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      try {
        await $apiAccountsApi.accountsUsersSetNewPassword(values)
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
            formErrors.current_password = 'Неверно введённый пароль'
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
                error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                errorMessage={
                  formik.touched.current_password && formik.errors.current_password
                    ? formik.errors.current_password
                    : ''
                }
                value={formik.values.current_password}
                onChange={formik.handleChange}
                name="current_password"
                type={showPassword.current_password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.current_password,
                  onHide: () => handleShowPassword('current_password'),
                  onShow: () => handleShowPassword('current_password'),
                })}
              />

              <TextField
                placeholder={t('Новый пароль')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type={showPassword.password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.password,
                  onHide: () => handleShowPassword('password'),
                  onShow: () => handleShowPassword('password'),
                })}
              />

              <TextField
                placeholder={t('Подтвердите пароль')}
                error={formik.touched.re_password && Boolean(formik.errors.re_password)}
                errorMessage={formik.touched.re_password && formik.errors.re_password ? formik.errors.re_password : ''}
                value={formik.values.re_password}
                onChange={formik.handleChange}
                name="re_password"
                type={showPassword.re_password ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword.re_password,
                  onHide: () => handleShowPassword('re_password'),
                  onShow: () => handleShowPassword('re_password'),
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
