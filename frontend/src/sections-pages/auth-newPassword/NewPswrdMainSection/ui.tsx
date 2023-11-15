import React, { useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { PATH_AUTH } from '@/shared/config'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { handleApiError, passwordLengthCheck } from '@/shared/lib/helpers'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Clock, X } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import cn from 'classnames'
import { newPasswordInitialValues, newPasswordValidationSchema } from './schema'
import { $apiAccountsApi } from '@/shared/api'

export const NewPasswordMainSection = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const token = (router.query.token as string) || ''
  const uid = (router.query.uid as string) || ''

  const [showPassword, setShowPassword] = useState({
    password: false,
    re_password: false,
  })

  const handleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const formik = useFormik({
    initialValues: newPasswordInitialValues,
    validationSchema: newPasswordValidationSchema(t),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await $apiAccountsApi.accountsUsersResetPasswordConfirm({ ...values, token, uid })
        setIsLoading(false)

        await router.push({
          pathname: PATH_AUTH.authSuccess,
          query: {
            title: t('auth.resetPassword.successChangePassword'),
            path: PATH_AUTH.root,
            buttonTitle: 'Перейти в авторизацию',
          },
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        setIsLoading(false)
        handleApiError(error)
      }
    },
  })

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mx-auto flex w-full max-w-[436px] flex-col gap-[20px]">
        <p className="text-center text-[24px] font-[500] text-black">
          <Trans i18nKey={'auth.resetPassword.headTextNewPassword'} />
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative mx-auto flex w-full flex-col gap-[12px]">
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={formik.touched.password ? formik.errors.password : ''}
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type={showPassword.password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.password,
                onHide: () => handleShowPassword('password'),
                onShow: () => handleShowPassword('password'),
              })}
              placeholder={'Новый пароль'}
            />

            <TextField
              error={formik.touched.re_password && Boolean(formik.errors.re_password)}
              errorMessage={formik.touched.re_password ? formik.errors.re_password : ''}
              value={formik.values.re_password}
              onChange={formik.handleChange}
              name="re_password"
              type={showPassword.re_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.re_password,
                onHide: () => handleShowPassword('re_password'),
                onShow: () => handleShowPassword('re_password'),
              })}
              placeholder={'Повторите пароль'}
            />
            <div
              className={cn(
                'flex items-center gap-[5px]',
                passwordLengthCheck({
                  password: formik.values.password,
                })
                  ? 'text-success700'
                  : 'text-neutral-500',
              )}
            >
              {passwordLengthCheck({ password: formik.values.password }) ? <Clock size={18} /> : <X size={18} />}
              <p className="text-[14px] font-[500] leading-[17px]">Ваш пароль должен содержать мин. 8 букв</p>
            </div>
          </div>

          <div className="mb-[62px] mt-[20px] flex w-full justify-center">
            <Button type="submit" disabled={isLoading}>
              <div className="flex items-center gap-[10px]">
                <Trans i18nKey={'auth.resetPassword.submit'} /> <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
