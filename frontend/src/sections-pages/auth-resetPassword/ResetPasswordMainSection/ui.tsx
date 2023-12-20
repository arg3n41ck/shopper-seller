import React, { useEffect, useState } from 'react'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { Clock } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import { resetPasswordValidationSchema } from './schema'
import { handleApiError } from '@/shared/lib/helpers'
import { $apiAccountsApi } from '@/shared/api'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'

export const ResetPasswordMainSection = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [smsSent, setSmsSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    validationSchema: resetPasswordValidationSchema(t),
    onSubmit: async (values) => {
      setIsLoading(true)

      try {
        setTimeLeft(180)
        setSmsSent(true)
        await $apiAccountsApi.accountsUsersResetPasswordRequestEmail({ email: values.email })
        setIsLoading(false)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        setIsLoading(false)
        handleApiError(error)
      }
    },
  })

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft])

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="" onClick={() => 'test'}></div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto flex w-full max-w-[436px] flex-col gap-[20px]">
          <p className="text-center text-[24px] font-[500] text-black">
            {smsSent ? 'Код подтверждения был отправлен на вашу почту' : 'Восстановление пароля'}
          </p>

          <div className="relative mx-auto flex w-full flex-col gap-[12px]">
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              value={smsSent ? formik.values.code : formik.values.email}
              onChange={formik.handleChange}
              name={'email'}
              placeholder={t('Введите адрес эл. почты')}
            />

            {timeLeft !== 0 && (
              <div className="absolute right-[-80px] top-[10px] flex items-center gap-[6px] text-[#676767] sm:relative sm:right-0 sm:top-0 sm:justify-end">
                <Clock size={24} />

                <p>{formatTime(timeLeft)}</p>
              </div>
            )}
            {smsSent && (
              <Button variant={BUTTON_STYLES.onlyText} className="ml-auto max-w-max bg-none" disabled={!!timeLeft}>
                <p
                  className="text-right text-[16px] font-[500] text-[#b91c1c] sm:text-left"
                  onClick={() => setTimeLeft(180)}
                >
                  Отправить код еще раз
                </p>
              </Button>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            <div className="flex items-center gap-[10px]">
              <Trans i18nKey={'auth.resetPassword.submit'} /> <LoaderIcon loading={isLoading} size={24} />
            </div>
          </Button>
        </div>
      </form>
    </div>
  )
}
