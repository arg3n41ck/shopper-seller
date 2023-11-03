import React, { FC, useState } from 'react'
import ShowAndHideIcon from 'src/shared/ui/templates/passwordShowAndHideIcon'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { $apiAccountsApi } from '@/shared/api'
import { useQueryClient } from '@tanstack/react-query'

interface IFormValues {
  password: string
  email: string
  repeat_email: string
}

interface Props {
  open: boolean
  onClose: () => void
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    password: yup.string().required(t('Обязательно брат')),
    email: yup.string().email(t('Неправильно брат')).required(t('Обязательно брат')),
    repeat_email: yup
      .string()
      .required(t('Повтори Эл почту брат'))
      .oneOf([yup.ref('email')], t('Не совпадает брат')),
  })

interface Props {
  open: boolean
  onClose: () => void
}

export const EditEmailModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient()

  const formik = useFormik<IFormValues>({
    initialValues: {
      password: '',
      email: '',
      repeat_email: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ email, repeat_email, password }, { resetForm }) => {
      setIsLoading(true)
      try {
        await $apiAccountsApi.accountsUsersChangeEmailRequest({
          email,
          current_password: password,
          re_email: repeat_email,
        })

        queryClient.invalidateQueries(['me'])

        toast.success('Ваша эл. почта изменена')

        setIsLoading(false)
        onClose()
        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        setIsLoading(false)
        const keysName = Object.keys(error.response.data)
        toast.error(error.response.data[keysName[0]][0])
      }
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[42px] py-[46px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Измените вашу эл. почту</p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить вашу эл. почту в любое время чтобы хранить ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <TextField
                placeholder={t('Новая Эл. Почта')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
              />

              <TextField
                placeholder={t('Подтвердите эл. почту')}
                error={formik.touched.repeat_email && Boolean(formik.errors.repeat_email)}
                errorMessage={
                  formik.touched.repeat_email && formik.errors.repeat_email ? formik.errors.repeat_email : ''
                }
                value={formik.values.repeat_email}
                onChange={formik.handleChange}
                name="repeat_email"
              />

              <TextField
                placeholder={t('Пароль')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword,
                  onHide: () => setShowPassword(false),
                  onShow: () => setShowPassword(true),
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
