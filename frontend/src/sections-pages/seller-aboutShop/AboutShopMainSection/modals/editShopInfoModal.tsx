import React, { useEffect, useState } from 'react'
import { SellerClient } from '@/shared/apis/sellerClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { fetchSeller } from '@/entities/seller/model/slice'
import { fetchMe } from '@/entities/user/model/slice'
import { Button } from 'src/shared/ui/buttons'
import { LoaderIcon } from '@/shared/ui/loaders'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { removeEmptyFields } from '@/shared/lib/helpers'
import { useFormik } from 'formik'
import { isEqual } from 'lodash'
import { PlusCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface IFormValues {
  shop_name: string
  site: string
  instagram: string
  links: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validationSchema = (t: (key: string) => string) =>
  yup.object({
    shop_name: yup.string().required('Название магазина'),
    site: yup.string().required('Сайт магазина').url('Неправильный формат URL'),
    instagram: yup.string().required('Instagram').url('Неправильный формат URL'),
  })

interface IEditShopInfoModalProps {
  open: boolean
  onClose: () => void
  slug: string
}

const sellerClient = new SellerClient()

export const EditShopInfoModal = ({ open, onClose, slug }: IEditShopInfoModalProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { seller } = useAppSelector((state) => state.seller)

  const formik = useFormik<IFormValues>({
    initialValues: {
      shop_name: '',
      site: '',
      instagram: '',
      links: [],
    },
    validationSchema: validationSchema(t),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async ({ links, ...others }: IFormValues) => {
      setIsLoading(true)

      if (isEqual(others, seller)) {
        onClose()
        return
      }

      try {
        await sellerClient.changeInfoSeller(removeEmptyFields(others))
        await dispatch(fetchMe())
        await dispatch(fetchSeller(slug))
        setIsLoading(false)
        onClose()
      } catch (error: any) {
        setIsLoading(false)
        if (error) {
          console.log(error)
        }
      }
    },
  })

  const handleClose = () => {
    onClose()
  }

  const handleAddSite = () => {
    const newLinks = [...formik.values.links, '']
    formik.setFieldValue('links', newLinks)
  }

  const setSellerFieldsInfo = async () => {
    const values: IFormValues = {
      shop_name: seller?.shop_name || '',
      site: seller?.site || '',
      instagram: seller?.instagram || '',
      links: [],
    }

    formik.setValues(values)
  }

  useEffect(() => {
    setSellerFieldsInfo()
  }, [seller])

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[46px] py-[42px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">Измените ваши данные</p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить ваши данные в любое время чтобы хранить ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-9 flex max-h-80 flex-col gap-8 overflow-y-scroll">
            <div className="flex flex-col gap-8">
              <TextField
                label={'Название магазина'}
                error={formik.touched.shop_name && Boolean(formik.errors.shop_name)}
                errorMessage={formik.touched.shop_name && formik.errors.shop_name ? formik.errors.shop_name : ''}
                value={formik.values.shop_name}
                onChange={formik.handleChange}
                name="shop_name"
              />

              <TextField
                label={'Сайт магазина'}
                error={formik.touched.site && Boolean(formik.errors.site)}
                errorMessage={formik.touched.site && formik.errors.site ? formik.errors.site : ''}
                value={formik.values.site}
                onChange={formik.handleChange}
                name="site"
              />

              <TextField
                label={'Instagram'}
                error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                errorMessage={formik.touched.instagram && formik.errors.instagram ? formik.errors.instagram : ''}
                value={formik.values.instagram}
                onChange={formik.handleChange}
                name="instagram"
              />

              {formik.values.links.map((link, index) => (
                <TextField
                  key={index}
                  label={`Ссылка #${index + 1}`}
                  value={link}
                  onChange={formik.handleChange}
                  name={`links.${index}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAddSite}
              variant={BUTTON_STYLES.secondaryCtaIndigo}
              size="small"
              type="button"
              disabled={true}
            >
              <div className="flex items-center gap-[10px]">
                Добавить ссылку
                <PlusCircle />
              </div>
            </Button>
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant={BUTTON_STYLES.primaryCtaIndigo} size="small">
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
