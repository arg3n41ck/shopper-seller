import { SellerClient } from '@/shared/apis/sellerClient'
import { BUTTON_STYLES, NEUTRAL } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { Button } from 'src/shared/ui/buttons'
import { Modal } from '@/shared/ui/modals'
import { TextArea } from '@/shared/ui/inputs/textArea'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Plus } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import SizesAndQuantity from '../sizesAndQuantity/ui'
import cn from 'classnames'

export type SizeQuantityType = { size: string; quantity: string }

interface VariantProps {
  open: boolean
  handleClose: () => void
}

type ImageType = { image: File; main_image: boolean }

interface FormValues {
  color_variant: string
  price: string
  images: ImageType[]
  size_quantity: SizeQuantityType[]
}

const sizeQuantitySchema = yup.object({
  size: yup.string().required('Введите размер'),
  quantity: yup
    .number()
    .typeError('Количество должно быть числом')
    .positive('Количество должно быть положительным числом')
    .required('Введите количество'),
})

const sellerClient = new SellerClient()

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    color_variant: yup.string().required('Обязательное поле'),
    price: yup.number().typeError('Цена должна быть числом').positive('Цена должна быть больше или равна 0'),
    size_quantity: yup.array().of(sizeQuantitySchema),
  })

const CreateVariantModal: FC<VariantProps> = ({ open, handleClose }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const id = (router.query?.id as string) || ''

  const formik = useFormik<FormValues>({
    initialValues: {
      color_variant: '',
      price: '',
      images: [],
      size_quantity: [{ size: '', quantity: '' }],
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
        // const previewBody = {
        //   color: values.color_variant,
        //   price: values.price,
        //   product_id: id,
        // };
        // const productPreview = await sellerClient.createProductPreview(
        //   removeEmptyFields(previewBody)
        // );
        // await Promise.all(
        //   values.size_quantity.map(async ({ size, quantity }) => {
        //     const productSize = await sellerClient.createProductPreviewSizes({
        //       size,
        //       quantity,
        //       product_preview_id: productPreview.id,
        //     });
        //     return productSize;
        //   })
        // );
        // await Promise.all(
        //   values.images.map(async ({ image, main_image }) => {
        //     const formData = new FormData();
        //     formData.append("image", image);
        //     const productImage = await sellerClient.createProductPreviewImages({
        //       product_preview_id: productPreview.id,
        //       image: formData,
        //       main_image,
        //     });
        //     return productImage;
        //   })
        // );
        // await dispatch(fetchProduct(productPreview.product_id));
        // resetForm();
        // setImageUrls([]);
        // handleClose();
      } catch (error) {
        console.log(error)
      }
    },
  })

  const isMainImage = (index: number) => formik.values.images[index]?.main_image

  const getButtonLabel = (index: number) => (isMainImage(index) ? 'Это главная картинка' : 'Сделать главной картинкой')

  const uploadImagesToClient = (files: ImageType[]): void =>
    files.forEach(({ image }) => setImageUrls((prevImageUrls) => [...prevImageUrls, URL.createObjectURL(image)]))

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files && files.length) {
      const images = Array.from(files).map((file) => ({
        image: file,
        main_image: false,
      }))
      uploadImagesToClient(images) // Загрузить все изображения на сервер
      formik.setFieldValue('images', [...formik.values.images, ...images])
    }
  }

  const onChange = async (name: string, value: SizeQuantityType[] | string) => formik.setFieldValue(name, value)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        maxWidth: '95%',
        maxHeight: '95%',
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <div className={'mx-auto  max-w-[490px] py-5 '}>
        <p className="text-[24px] font-[500] text-black">Настройки варианта</p>

        <div className="mt-5 max-w-[482px]">
          <TextField
            error={formik.touched.color_variant && Boolean(formik.errors.color_variant)}
            errorMessage={formik.touched.color_variant ? formik.errors.color_variant : ''}
            value={formik.values.color_variant}
            onChange={formik.handleChange}
            placeholder="Цвет варианта"
            name="color_variant"
          />
        </div>
        <p className="mb-5 mt-8 text-[18px] font-[500] text-neutral-900">Размеры и количество</p>
        <div className="flex flex-col gap-[20px]">
          <SizesAndQuantity
            value={formik.values.size_quantity}
            onChange={onChange}
            touched={formik.touched.size_quantity}
            error={formik.errors.size_quantity}
          />
        </div>

        <p className="mb-3 mt-16 text-[18px] font-[500] text-neutral-900">Добавьте фотографии варианта продукта</p>
        <div className="flex flex-wrap items-center gap-[16px]">
          {!!formik.values.images.length &&
            formik.values.images.map((item: ImageType, index) => {
              if (typeof item === 'string') {
                return (
                  <div
                    className={cn(
                      `relative h-[187px] w-full max-w-[150px] cursor-pointer rounded-[5px] border-[2px] hover:border-primaryDash600`,
                      { ['border-primaryDash600']: isMainImage(index) },
                    )}
                    key={index}
                    onClick={() => formik.setFieldValue(`images.${index}.main_image`, !isMainImage(index))}
                  >
                    <img className="absolute z-[1] h-full w-full rounded-[5px] object-cover" src={item} />
                  </div>
                )
              }
              return null
            })}

          {!!imageUrls.length &&
            imageUrls.map((item: string, index: number) => (
              <div
                key={index}
                onClick={() => formik.setFieldValue(`images.${index}.main_image`, !isMainImage(index))}
                className={cn(
                  `relative h-[187px] w-full max-w-[150px] cursor-pointer rounded-[5px] border-[2px] hover:border-primaryDash600`,
                  { ['border-primaryDash600']: isMainImage(index) },
                )}
              >
                <img className="absolute z-[1] h-full w-full rounded-[5px] object-cover" src={item} />
              </div>
            ))}
          <label
            className={`
            relative inline-block h-[187px] w-full max-w-[150px] 
            cursor-pointer overflow-hidden rounded-[5px] border-[1px] 
            border-neutral-900 hover:bg-neutral-100
            `}
            htmlFor={'user-logo'}
          >
            <input
              className="absolute z-[4] h-full w-full cursor-pointer opacity-0"
              id="user-logo"
              name={'image'}
              accept="image/*"
              onChange={(e) => handleImagesChange(e)}
              type="file"
              multiple
            />
            <div
              className={`
            absolute left-[50%] top-[50%] z-[2] flex h-full w-full 
            translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center
            `}
            >
              <Plus size={46} color={NEUTRAL[900]} />
            </div>
          </label>
        </div>

        <TextArea
          error={formik.touched.color_variant && Boolean(formik.errors.color_variant)}
          errorMessage={formik.touched.color_variant ? formik.errors.color_variant : ''}
          value={formik.values.color_variant}
          onChange={formik.handleChange}
          placeholder="Дополнительная информация о модели"
          name="color_variant"
          className={'mt-5'}
        />
        <div className="mx-auto mt-[40px] max-w-[187px]">
          <Button onClick={() => formik.handleSubmit()} variant={BUTTON_STYLES.primaryCta} type="submit">
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateVariantModal
