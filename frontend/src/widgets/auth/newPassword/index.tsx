import React, { FC, useState } from 'react'
import AuthLayout from '@/components/layouts/authLayout'
import ShowAndHideIcon from '@/components/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { TypeResetPassword } from '@/shared/lib/types/authTypes'
import { PATH_AUTH } from '@/shared/routes/paths'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import LoaderIcon from '@/shared/ui/loader'
import TextField from '@/shared/ui/textField'
import { passwordLengthCheck } from '@/shared/utils/password'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Clock, X } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { ResetPasswordContainer, TextFieldContainer } from '../resetPassword/styles'
import { ButtonCont, HeadingText, PasswordHandlerCont } from '../styles'

interface FormValues {
  new_password: string
  repeat_password: string
}

const validationSchema = (t: (key: string) => string) =>
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

const initialValues: FormValues = {
  new_password: '',
  repeat_password: '',
}

const authClient = new AuthClient()

export const NewPasswordPage: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const token = (router.query.token as string) || ''
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<{
    new_password: boolean
    repeat_password: boolean
  }>({
    new_password: false,
    repeat_password: false,
  })

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit: async ({ new_password }) => {
      setIsLoading(true)
      const body: TypeResetPassword = {
        token,
        new_password,
      }

      try {
        await authClient.resetPassword(body)
        setIsLoading(false)
        await router.push({
          pathname: PATH_AUTH.authSuccess,
          query: {
            title: t('auth.resetPassword.successChangePassword'),
            path: PATH_AUTH.root,
          },
        })
      } catch (error) {
        setIsLoading(false)
        // console.log(error)
      }
    },
  })

  const handleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <AuthLayout>
      <ResetPasswordContainer>
        <HeadingText>
          <Trans i18nKey={'auth.resetPassword.headTextNewPassword'} />
        </HeadingText>

        <form onSubmit={formik.handleSubmit}>
          <TextFieldContainer>
            <TextField
              error={formik.touched.new_password && Boolean(formik.errors.new_password)}
              errorMessage={formik.touched.new_password ? formik.errors.new_password : ''}
              value={formik.values.new_password}
              onChange={formik.handleChange}
              name="new_password"
              type={showPassword.new_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.new_password,
                onHide: () => handleShowPassword('new_password'),
                onShow: () => handleShowPassword('new_password'),
              })}
              placeholder={'Новый пароль'}
            />

            <TextField
              error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
              errorMessage={formik.touched.repeat_password ? formik.errors.repeat_password : ''}
              value={formik.values.repeat_password}
              onChange={formik.handleChange}
              name="repeat_password"
              type={showPassword.repeat_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.repeat_password,
                onHide: () => handleShowPassword('repeat_password'),
                onShow: () => handleShowPassword('repeat_password'),
              })}
              placeholder={'Повторите пароль'}
            />

            <PasswordHandlerCont
              $error={passwordLengthCheck({
                password: formik.values.new_password,
              })}
            >
              {passwordLengthCheck({ password: formik.values.new_password }) ? <Clock size={18} /> : <X size={18} />}
              <p>Ваш пароль должен содержать мин. 8 букв</p>
            </PasswordHandlerCont>
          </TextFieldContainer>

          <ButtonCont>
            <Button type="submit" disabled={isLoading}>
              <ButtonInfoCont>
                <Trans i18nKey={'auth.resetPassword.submit'} /> <LoaderIcon loading={isLoading} size={24} />
              </ButtonInfoCont>
            </Button>
          </ButtonCont>
        </form>
      </ResetPasswordContainer>
    </AuthLayout>
  )
}
