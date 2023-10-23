import React, { FC, useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { setLocalStorageValues } from '@/shared/lib/hooks/useLocalStorage'
import { TypeLogIn } from '@/shared/lib/types/authTypes'
import { PATH_AUTH, PATH_LK_SELLER } from '@/shared/config'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { fetchMe } from '@/entities/user'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { ArrowRight } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import * as yup from 'yup'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

const authClient = new AuthClient()

interface IFormErrors {
  username?: string
  password?: string
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    username: yup.string().email(t('auth.validation.email.invalid')).required(t('auth.validation.email.required')),
    password: yup.string().required(t('auth.validation.password.required')),
  })

export const LoginMainSection: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const email = (router.query?.email as string) || ''
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik<TypeLogIn>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const loginResponse = await authClient.login(values)

        setLocalStorageValues({
          access_token: loginResponse.access_token,
          refresh_token: loginResponse.refresh_token,
        })

        const { payload } = await dispatch(fetchMe())
        const isSeller = payload?.user_type === 'seller'

        setIsLoading(false)
        await router.push({
          pathname: PATH_AUTH.authSuccess,
          query: {
            title: t('auth.logIn.welcome'),
            path: isSeller ? PATH_LK_SELLER.root : PATH_AUTH.root,
          },
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError<IFormErrors>) {
        setIsLoading(false)
        if (error.response && error.response.status === 400) {
          const { data } = error.response
          const formErrors: IFormErrors = {}

          if (data?.detail) {
            formErrors.username = t('auth.validation.password.error') as string
            formErrors.password = t('auth.validation.password.error') as string
          }

          formik.setErrors(formErrors)
        }
      }
    },
  })

  const navigateToNewPassword = async () => {
    await router.push({
      pathname: PATH_AUTH.resetPassword,
      query: { email: formik.values.username },
    })
  }

  const navigateToSignUp = async () => {
    await router.push({ pathname: PATH_AUTH.signUp })
  }

  return (
    <>
      <div className="flex w-full justify-between gap-[20px] md:justify-center">
        <div className="md:hidden">
          <h1 className="text-[60px] font-[600] text-black">СТАНЬ ПАРТНЕРОМ</h1>
          <p className="text-[60px] font-[500] text-black">SHOPPER</p>
          <p className="text-[22px] font-[400] text-[#676767]">SHOPPER - партнер которого выбирают миллионы</p>
          <div className="mt-[40px] flex w-max cursor-pointer items-center gap-[8px]">
            <p className="text-[20px] font-[500] text-[#171717]">Подробнее</p>
            <ArrowRight />
          </div>
        </div>

        <div className="flex w-full max-w-[434px] flex-col gap-[20px]">
          <p className="text-center text-[24px] font-[500] text-black">Добро пожаловать!</p>

          <form onSubmit={formik.handleSubmit}>
            <div className="mx-auto flex w-full flex-col gap-[20px]">
              <TextField
                placeholder={t('auth.fields.email')}
                error={formik.touched.username && Boolean(formik.errors.username)}
                errorMessage={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                value={formik.values.username}
                onChange={formik.handleChange}
                name="username"
              />

              <TextField
                placeholder={t('auth.fields.password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword,
                  onHide: () => setShowPassword((prev) => !prev),
                  onShow: () => setShowPassword((prev) => !prev),
                })}
              />

              <p
                className="cursor-pointer text-right text-[16px] font-[500] text-[#b91c1c]"
                onClick={navigateToNewPassword}
              >
                <Trans i18nKey={'auth.logIn.forgetThePassword'} />
              </p>
            </div>

            <Button type="submit" disabled={isLoading} className={'mt-[20px]'}>
              <div className="flex items-center gap-[10px]">
                <Trans i18nKey={'Войти'} /> <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </form>

          <p className="text-center text-[24px] font-[500] text-black">Новый партнер?</p>
          <Button type="button" variant={BUTTON_STYLES.withoutBackground} onClick={navigateToSignUp}>
            <div className="flex items-center gap-[10px]">
              <Trans i18nKey={'Зарегестрироваться'} />
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}
