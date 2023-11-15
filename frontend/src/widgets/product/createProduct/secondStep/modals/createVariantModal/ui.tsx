import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import SizesAndQuantity from '../sizesAndQuantity/ui'
import { AddImages } from '@/feautures/product/create-product'
import { Modal } from '@/shared/ui/modals'
import TextField from '@/shared/ui/inputs/textField'
import { TextArea } from '@/shared/ui/inputs/textArea'
import { Button } from '@/shared/ui/buttons'
import { Trash2 } from 'react-feather'
import { DeleteVariantBackdrop } from '../deleteVariantBackboard'
import { isNumber } from 'lodash'
import { TypeImageFile, TypeSizeQuantity, TypeVariant } from '@/shared/lib/types/sellerTypes'
import CustomSwitch from '@/shared/ui/inputs/switch'
import { handleApiError } from '@/shared/lib/helpers'

interface VariantProps {
  open: boolean
  handleClose: () => void
  addVariant?: (value: TypeVariant) => void
  editVariant?: (index: string | number, value: TypeVariant) => void
  removeVariant?: (index: string | number) => void
  defaultValues?: TypeVariant
}

const sizeQuantitySchema = yup.object({
  size: yup.string().required('Введите размер'),
  price: yup.number().nullable(),
  quantity: yup
    .number()
    .typeError('Количество должно быть числом')
    .positive('Количество должно быть положительным числом')
    .required('Введите количество'),
})

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    title: yup.string().required(t('Обязательное поле')),
    size_variants: yup.array().of(sizeQuantitySchema),
    description: yup.string().required(t('Введите информацию о модели')),
  })

const CreateVariantModal: FC<VariantProps> = ({
  open,
  handleClose,
  editVariant,
  addVariant,
  removeVariant,
  defaultValues = {
    title: '',
    images: [],
    size_variants: [{ size: '', quantity: '', price: null }],
    description: '',
  },
}) => {
  const { t } = useTranslation()
  const [isDeleteBackdrop, setIsDeleteBackdrop] = useState<boolean>(false)
  const idOfVariant = isNumber(defaultValues?.index) ? defaultValues?.index : (defaultValues?.slug as string | number)
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false)

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchEnabled(checked)
  }

  const handleShowDeleteBackDrop = () => setIsDeleteBackdrop((prev) => !prev)

  const formik = useFormik<TypeVariant>({
    initialValues: defaultValues,
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        // eslint-disable-next-line
        const { slug, id, ...restValues } = values

        isNumber(defaultValues.index) || defaultValues?.slug
          ? editVariant && editVariant(idOfVariant, restValues)
          : addVariant && addVariant(values)

        resetForm()
        handleClose()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        handleApiError(error)
      }
    },
  })

  const onChangeFormik = async (name: string, value: TypeSizeQuantity[] | string | number) =>
    formik.setFieldValue(name, value)

  const handleDeleteFieldOfSizeAndQuantity = (index: number) => {
    const updatedFields = [...formik.values.size_variants].filter((_, i) => i !== index)

    formik.setFieldValue('size_variants', updatedFields)
  }

  const handleDeleteImage = (indexOfImageToDelete: number) => {
    const updatedImages = [...formik.values.images].filter((_, index: number) => index !== indexOfImageToDelete)
    formik.setFieldValue('images', updatedImages)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          maxWidth: '801px',
          maxHeight: '95%',
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        <div className={'px-10 py-5'}>
          <p className="text-2xl font-semibold text-[#000]">Настройки варианта</p>

          <div className="mt-10 max-w-[482px]">
            <TextField
              error={formik.touched.title && Boolean(formik.errors.title)}
              errorMessage={formik.touched.title ? formik.errors.title : ''}
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Название цвета"
              label="Название цвета"
              name="title"
            />
          </div>

          <p className="mb-3 mt-[30px] text-[18px] font-semibold text-neutral-900">Фотографии</p>

          <AddImages
            value={formik.values.images}
            fieldTitle={'images'}
            onChange={(name: string, value: TypeImageFile[] | string | boolean) => formik.setFieldValue(name, value)}
            deleteImage={handleDeleteImage}
          />

          <p className="mb-5 mt-8 text-[18px] font-semibold text-neutral-900">Размеры и количество</p>

          <div className="flex w-full max-w-[490px] justify-between gap-3">
            <p className="w-[430.52px] text-base font-medium text-neutral-900">Указать цену для каждого размера</p>

            <CustomSwitch checked={isSwitchEnabled} onChange={handleSwitchChange} />
          </div>

          <div className="flex w-full max-w-[558px] flex-col gap-5">
            <SizesAndQuantity
              value={formik.values.size_variants}
              onChange={onChangeFormik}
              touched={formik.touched.size_variants}
              error={formik.errors.size_variants}
              addPriceField={isSwitchEnabled}
              onDelete={handleDeleteFieldOfSizeAndQuantity}
            />
          </div>

          <TextArea
            error={formik.touched.description && Boolean(formik.errors.description)}
            errorMessage={formik.touched.description ? formik.errors.description : ''}
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Дополнительная информация о модели"
            name="description"
            className={'mt-5 max-w-[490px]'}
          />

          <div className="mt-10 flex items-center gap-[30px]">
            <Button
              onClick={handleShowDeleteBackDrop}
              variant={BUTTON_STYLES.error}
              type="submit"
              className="max-w-[258px]"
            >
              <div className="flex items-center gap-2">
                <Trash2 size={20} />
                Удалить вариант
              </div>
            </Button>

            <Button
              onClick={() => formik.handleSubmit()}
              variant={BUTTON_STYLES.primaryCta}
              type="submit"
              className="max-w-[258px]"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>

      <DeleteVariantBackdrop
        open={isDeleteBackdrop}
        onClose={handleShowDeleteBackDrop}
        deleteVariant={() => removeVariant && removeVariant(idOfVariant)}
      />
    </>
  )
}

export default CreateVariantModal
