import React, { useState } from 'react'
import { Button } from 'src/shared/ui/buttons'
import { AlertCircle, Check } from 'react-feather'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import Checkbox from 'src/shared/ui/inputs/checkbox'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { handleApiError, passwordLengthCheck } from '@/shared/lib/helpers'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'react-i18next'
import cn from 'classnames'
import { signUpValidationSchema } from './schema'
import { setLocalStorageValues } from '@/shared/lib/hooks/useLocalStorage'
import { $apiAccountsApi } from '@/shared/api'
import { toast } from 'react-toastify'
import { PATH_AUTH, PATH_LK_SELLER } from '@/shared/config'

export const SignUpMainSection = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const email = (router.query?.email as string) || ''
  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState<{
    password: boolean
    re_password: boolean
  }>({
    password: false,
    re_password: false,
  })
  const handlePasswordToggle = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const formik = useFormik({
    initialValues: {
      shop_name: '',
      phone_number: '',
      email,
      password: '',
      re_password: '',
      code: '',
      agree: false,
    },
    validationSchema: signUpValidationSchema(),
    onSubmit: async (values) => {
      setIsLoading(true)

      try {
        setIsLoading(false)

        const body = {
          ...values,
          seller_key: {
            key: values.code,
          },
          shop: {
            title: values.shop_name,
          },
        }

        const {
          data: { response },
        } = (await $apiAccountsApi.accountsUsersCreateSellerCreate(body)) as unknown as {
          data: {
            code: number
            message: string
            response: { access: string; refresh: string }
          }
        }

        setLocalStorageValues({
          access_token: response.access,
          refresh_token: response.refresh,
        })

        toast.success('Вы успешно создали аккаунт')

        await router.push({
          pathname: PATH_AUTH.authSuccess,
          query: {
            title: t('Вы успешно зарегестрировались!'),
            buttonTitle: 'Перейти в личный кабинет',
            path: PATH_LK_SELLER.root,
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
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto flex w-full max-w-[436px] flex-col gap-[20px]">
          <p className="text-center text-[24px] font-[500] text-black">
            <Trans i18nKey={'Новый пользователь'} />
          </p>
          <div className="flex flex-col gap-[12px]">
            <TextField
              placeholder={t('Название магазина')}
              error={formik.touched.shop_name && Boolean(formik.errors.shop_name)}
              errorMessage={formik.touched.shop_name && formik.errors.shop_name ? formik.errors.shop_name : ''}
              value={formik.values.shop_name}
              onChange={formik.handleChange}
              name="shop_name"
            />

            <TextField
              placeholder={t('Номер телефона')}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              errorMessage={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''}
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              name="phone_number"
            />

            <TextField
              placeholder={t('Электронная почта')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />

            <TextField
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
              onChange={formik.handleChange}
              name="password"
              type={showPassword.password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.password,
                onHide: () => handlePasswordToggle('password'),
                onShow: () => handlePasswordToggle('password'),
              })}
              placeholder="Пароль"
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
              {passwordLengthCheck({ password: formik.values.password }) ? (
                <Check size={16} />
              ) : (
                <AlertCircle size={16} />
              )}

              <p className="text-[14px] font-[500] leading-[17px]">Ваш пароль должен содержать мин. 8 букв</p>
            </div>

            <TextField
              value={formik.values.re_password}
              error={formik.touched.re_password && Boolean(formik.errors.re_password)}
              errorMessage={formik.touched.re_password && formik.errors.re_password ? formik.errors.re_password : ''}
              onChange={formik.handleChange}
              name="re_password"
              type={showPassword.re_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.re_password,
                onHide: () => handlePasswordToggle('re_password'),
                onShow: () => handlePasswordToggle('re_password'),
              })}
              placeholder="Повторите пароль"
            />

            <TextField
              placeholder={t('Код подтверждения')}
              error={formik.touched.code && Boolean(formik.errors.code)}
              errorMessage={formik.touched.code && formik.errors.code ? formik.errors.code : ''}
              value={formik.values.code}
              onChange={formik.handleChange}
              name="code"
            />
          </div>

          <Checkbox
            label={'Я принимаю условия соглашения Shopper'}
            checked={formik.values.agree}
            onChange={() => formik.setFieldValue('agree', !formik.values.agree)}
          />

          <Button type="submit" disabled={isLoading || !formik.values.agree}>
            <div className="flex items-center gap-[10px]">
              <Trans i18nKey={'Зарегистрироваться'} /> <LoaderIcon loading={isLoading} size={24} />
            </div>
          </Button>
        </div>
      </form>
    </div>
  )
}
