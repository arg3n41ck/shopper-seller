import React, { useEffect, useState } from 'react'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { Clock } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import { resetPasswordValidationSchema } from './schema'
import { toast } from 'react-toastify'

export const ResetPasswordMainSection = () => {
  const { t } = useTranslation()
  // const email = router.query?.email as string || '';
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [smsSent, setSmsSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      code: '',
    },
    validationSchema: resetPasswordValidationSchema(t),
    onSubmit: async () => {
      setIsLoading(true)

      try {
        setTimeLeft(180)
        setSmsSent(true)
        // const { user_exists } =
        //   await authClient.checkUserByEmailForResetPassword({ phone_number });
        setIsLoading(false)
        // if (user_exists)
        //   return router.push({
        //     pathname: PATH_AUTH.newPassword,
        //     query: { phone_number },
        //   });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        setIsLoading(false)
        const keysName = Object.keys(error.response.data)
        toast.error(error.response.data[keysName[0]][0])
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
            {/* <Trans i18nKey={'auth.resetPassword.headText'} /> */}
            {smsSent ? 'Код подтверждения был отправлен на ваш номер телефона' : 'Восстановление пароля'}
          </p>

          <div className="relative mx-auto flex w-full flex-col gap-[12px]">
            <TextField
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              errorMessage={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''}
              value={smsSent ? formik.values.code : formik.values.phone_number}
              onChange={formik.handleChange}
              name={smsSent ? 'code' : 'phone_number'}
              placeholder={t(smsSent ? 'Введите код подтверждения ' : '+996')}
            />

            {timeLeft !== 0 && (
              <div className="absolute right-[-80px] top-[10px] flex items-center gap-[6px] text-[#676767] sm:relative sm:right-0 sm:top-0 sm:justify-end">
                <Clock size={24} />

                <p>{formatTime(timeLeft)}</p>
              </div>
            )}
            {smsSent && (
              <p
                className="text-right text-[16px] font-[500] text-[#b91c1c] sm:text-left"
                onClick={() => setTimeLeft(180)}
              >
                Отправить код еще раз
              </p>
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
