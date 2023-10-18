import React, { useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { TypeResetPassword } from '@/shared/lib/types/authTypes'
import { PATH_AUTH } from '@/shared/config'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { passwordLengthCheck } from '@/shared/lib/helpers'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Clock, X } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import cn from 'classnames'
import { newPasswordInitialValues, newPasswordValidationSchema } from './schema'

const authClient = new AuthClient()

export const NewPasswordMainSection = () => {
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
  const handleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const formik = useFormik({
    initialValues: newPasswordInitialValues,
    validationSchema: newPasswordValidationSchema(t),
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

  return (
    <>
      <div className="mx-auto flex w-full max-w-[436px] flex-col gap-[20px]">
        <p className="text-center text-[24px] font-[500] text-black">
          <Trans i18nKey={'auth.resetPassword.headTextNewPassword'} />
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative mx-auto flex w-full flex-col gap-[12px]">
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
            <div
              className={cn(
                'flex items-center gap-[5px]',
                passwordLengthCheck({
                  password: formik.values.new_password,
                })
                  ? 'text-success700'
                  : 'text-neutral-500',
              )}
            >
              {passwordLengthCheck({ password: formik.values.new_password }) ? <Clock size={18} /> : <X size={18} />}
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
    </>
  )
}
