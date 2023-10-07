import React, { FC, useEffect, useState } from 'react'
import AuthLayout from '@/components/layouts/authLayout'
import { AuthClient } from '@/shared/apis/authClient'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import LoaderIcon from '@/shared/ui/loader'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Clock } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { HeadingText } from '../styles'
import { ResendSMSText, ResetPasswordContainer, TextFieldContainer, TimerContainer } from './styles'

interface ResetPasswordProps {}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    phone_number: yup.string().required(t('Некорректный номер телефона')),
  })

const authClient = new AuthClient()

export const ResetPasswordPage: FC<ResetPasswordProps> = () => {
  const { t } = useTranslation()
  const router = useRouter()
  // const email = router.query?.email as string || '';
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [smsSent, setSmsSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      code: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      setIsLoading(true)

      try {
        setTimeLeft(180)
        setSmsSent(true)
        console.log(values)
        // const { user_exists } =
        //   await authClient.checkUserByEmailForResetPassword({ phone_number });
        setIsLoading(false)
        // if (user_exists)
        //   return router.push({
        //     pathname: PATH_AUTH.newPassword,
        //     query: { phone_number },
        //   });
      } catch (error) {
        setIsLoading(false)
        console.log(error)
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
    <AuthLayout>
      <div className="" onClick={() => 'test'}></div>
      <form onSubmit={formik.handleSubmit}>
        <ResetPasswordContainer>
          <HeadingText>
            {/* <Trans i18nKey={'auth.resetPassword.headText'} /> */}
            {smsSent ? 'Код подтверждения был отправлен на ваш номер телефона' : 'Восстановление пароля'}
          </HeadingText>
          <TextFieldContainer>
            <TextField
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              errorMessage={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''}
              value={smsSent ? formik.values.code : formik.values.phone_number}
              onChange={formik.handleChange}
              name={smsSent ? 'code' : 'phone_number'}
              placeholder={t(smsSent ? 'Введите код подтверждения ' : '+996')}
            />

            {timeLeft !== 0 && (
              <TimerContainer>
                <Clock size={24} />

                <p>{formatTime(timeLeft)}</p>
              </TimerContainer>
            )}
            {smsSent && <ResendSMSText onClick={() => setTimeLeft(180)}>Отправить код еще раз</ResendSMSText>}
          </TextFieldContainer>

          <Button type="submit" disabled={isLoading}>
            <ButtonInfoCont>
              <Trans i18nKey={'auth.resetPassword.submit'} /> <LoaderIcon loading={isLoading} size={24} />
            </ButtonInfoCont>
          </Button>
        </ResetPasswordContainer>
      </form>
    </AuthLayout>
  )
}
