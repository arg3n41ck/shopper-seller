import React, { FC, useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { handleApiError } from '@/shared/lib/helpers'
import { ArrowLeft } from 'react-feather'

interface IFormValues {
  phone_number: string
  code: string
}

interface Props {
  open: boolean
  onClose: () => void
}

const validationSchema = (t: (key: string) => string, currentStep: number) =>
  yup.object({
    phone_number: yup.string().required(t('Обязательно брат')),
    code: yup.string().when([], () => {
      if (currentStep === 2) {
        return yup.string().required(t('Обязательно брат'))
      }
      return yup.string()
    }),
  })

interface Props {
  open: boolean
  onClose: () => void
}

export const EditPhoneNumberModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  // const queryClient = useQueryClient()

  const formik = useFormik<IFormValues>({
    initialValues: {
      phone_number: '',
      code: '',
    },
    validationSchema: validationSchema(t, currentStep),
    onSubmit: async () => {
      setIsLoading(true)
      try {
        if (currentStep === 1) {
          setCurrentStep(2)
          setIsLoading(false)
        } else {
          onClose()
        }

        // await $apiAccountsApi.accountsUsersChangePhoneNumberRequest({
        //   current_password: password,
        //   phone_number,
        //   re_phone_number: repeat_phone_number,
        // })

        // await queryClient.invalidateQueries(['me'])

        // toast.success('Ваш номер телефона изменен')

        // setIsLoading(false)
        // onClose()
        // resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        setIsLoading(false)
        handleApiError(error)
      }
    },
  })

  const goToFirstStep = () => setCurrentStep(1)

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      {currentStep === 2 && (
        <div onClick={goToFirstStep} className="absolute left-[24px] top-[24px] cursor-pointer">
          <ArrowLeft />
        </div>
      )}

      <div className="px-10 pb-10 pt-[60px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Номер телефона</p>

          <p className="mt-5 text-[13.33px] leading-[16px] text-neutral-900">
            {currentStep === 1
              ? '+996 998 554 331'
              : `Код подтверждения отправлен на номер ${formik.values.phone_number}`}{' '}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="my-5 flex flex-col gap-8">
            {currentStep === 1 ? (
              <TextField
                placeholder={t('Новый номер телефона')}
                label={t('Новый номер телефона')}
                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                errorMessage={
                  formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''
                }
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                name="phone_number"
              />
            ) : (
              <TextField
                placeholder={t('Код подтверждения')}
                error={formik.touched.code && Boolean(formik.errors.code)}
                errorMessage={formik.touched.code && formik.errors.code ? formik.errors.code : ''}
                value={formik.values.code}
                onChange={formik.handleChange}
                name="code"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button onClick={onClose} variant={BUTTON_STYLES.withoutBackground} type="button">
              <div className="flex items-center gap-[10px]">Отмена</div>
            </Button>

            <Button variant={BUTTON_STYLES.primaryCta}>
              <div className="flex items-center gap-[10px]">
                {currentStep === 1 ? 'Продолжить' : 'Подтвердить'}
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
