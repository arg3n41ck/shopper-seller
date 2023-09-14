import { SellerClient } from '@/shared/apis/sellerClient'
import { BUTTON_STYLES, NEUTRAL } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import Button from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'
import { TextArea } from '@/shared/ui/textArea'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Plus } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import SizesAndQuantity from '../sizesAndQuantity/ui'
import {
	FileUploadLabel,
	HeaderText,
	ImageContainer,
	ImageInfo,
	ImageS,
	ImagesContainer,
	SaveButtonBlock,
	SizeAndQuantityVariantContainer,
	TitleAndPriceVariantContainer,
	TitleField,
} from '../styles'

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
		price: yup
			.number()
			.typeError('Цена должна быть числом')
			.positive('Цена должна быть больше или равна 0'),
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

	const getButtonLabel = (index: number) =>
		isMainImage(index) ? 'Это главная картинка' : 'Сделать главной картинкой'

	const uploadImagesToClient = (files: ImageType[]): void =>
		files.forEach(({ image }) =>
			setImageUrls(prevImageUrls => [
				...prevImageUrls,
				URL.createObjectURL(image),
			])
		)

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files
		if (files && files.length) {
			const images = Array.from(files).map(file => ({
				image: file,
				main_image: false,
			}))
			uploadImagesToClient(images) // Загрузить все изображения на сервер
			formik.setFieldValue('images', [...formik.values.images, ...images])
		}
	}

	const onChange = async (name: string, value: SizeQuantityType[] | string) =>
		formik.setFieldValue(name, value)

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
			<div className={'max-w-[490px]  mx-auto py-5 '}>
				<HeaderText>Настройки варианта</HeaderText>

				<TitleAndPriceVariantContainer className='mt-5'>
					<TextField
						error={
							formik.touched.color_variant &&
							Boolean(formik.errors.color_variant)
						}
						errorMessage={
							formik.touched.color_variant ? formik.errors.color_variant : ''
						}
						value={formik.values.color_variant}
						onChange={formik.handleChange}
						placeholder='Цвет варианта'
						name='color_variant'
					/>
				</TitleAndPriceVariantContainer>

				<TitleField className='mt-8 mb-5'>Размеры и количество</TitleField>

				<SizeAndQuantityVariantContainer>
					<SizesAndQuantity
						value={formik.values.size_quantity}
						onChange={onChange}
						touched={formik.touched.size_quantity}
						error={formik.errors.size_quantity}
					/>
				</SizeAndQuantityVariantContainer>

				<TitleField className='mt-16 mb-3'>
					Добавьте фотографии варианта продукта
				</TitleField>

				<ImagesContainer>
					{!!formik.values.images.length &&
						formik.values.images.map((item: ImageType, index) => {
							if (typeof item === 'string') {
								return (
									<ImageContainer
										key={index}
										onClick={() =>
											formik.setFieldValue(
												`images.${index}.main_image`,
												!isMainImage(index)
											)
										}
										$isMainImage={isMainImage(index)}
									>
										<ImageS src={item} />
									</ImageContainer>
								)
							}
							return null
						})}

					{!!imageUrls.length &&
						imageUrls.map((item: string, index: number) => (
							<ImageContainer
								key={index}
								onClick={() =>
									formik.setFieldValue(
										`images.${index}.main_image`,
										!isMainImage(index)
									)
								}
								$isMainImage={isMainImage(index)}
							>
								<ImageS src={item} />
							</ImageContainer>
						))}

					<FileUploadLabel htmlFor={'user-logo'}>
						<input
							id='user-logo'
							name={'image'}
							accept='image/*'
							onChange={e => handleImagesChange(e)}
							type='file'
							multiple
						/>

						<ImageInfo>
							<Plus size={46} color={NEUTRAL[900]} />
						</ImageInfo>
					</FileUploadLabel>
				</ImagesContainer>

				<TextArea
					error={
						formik.touched.color_variant && Boolean(formik.errors.color_variant)
					}
					errorMessage={
						formik.touched.color_variant ? formik.errors.color_variant : ''
					}
					value={formik.values.color_variant}
					onChange={formik.handleChange}
					placeholder='Дополнительная информация о модели'
					name='color_variant'
					className={'mt-5'}
				/>

				<SaveButtonBlock>
					<Button
						onClick={formik.handleSubmit}
						variant={BUTTON_STYLES.primaryCta}
						type='submit'
					>
						Сохранить
					</Button>
				</SaveButtonBlock>
			</div>
		</Modal>
	)
}

export default CreateVariantModal
