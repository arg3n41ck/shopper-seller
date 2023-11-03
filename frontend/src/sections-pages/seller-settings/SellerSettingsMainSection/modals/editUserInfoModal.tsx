import React, { FC, useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'

interface IFormValues {
  first_name: string
  last_name: string
}

interface Props {
  open: boolean
  onClose: () => void
}

const sellerClient = new SellerClient()

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    first_name: yup.string().required(t('Обязательно брат')),
    last_name: yup.string().required(t('Обязательно брат')),
  })

interface Props {
  open: boolean
  onClose: () => void
}

export const EditUserInfoModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)
  const queryClient = useQueryClient()

  const mutationEditShop = useMutation((userData: IFormValues) => sellerClient.updateUser({ userData }))

  const formik = useFormik<IFormValues>({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ first_name, last_name }, { resetForm }) => {
      setIsLoading(true)
      try {
        await mutationEditShop.mutateAsync({ first_name, last_name })

        queryClient.invalidateQueries(['me'])

        toast.success('Данные вашего магазина изменены')

        setIsLoading(false)
        onClose()
        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
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
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Измените ваше ФИО</p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить ваше ФИО в любое время чтобы хранить ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <TextField
                placeholder={t('Имя')}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                errorMessage={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ''}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                name="first_name"
              />

              <TextField
                placeholder={t('Фамилия')}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                errorMessage={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''}
                value={formik.values.last_name}
                onChange={formik.handleChange}
                name="last_name"
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
