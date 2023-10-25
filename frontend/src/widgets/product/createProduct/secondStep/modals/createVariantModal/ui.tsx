import { SellerClient } from '@/shared/apis/sellerClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import Button from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'
import { TextArea } from '@/shared/ui/textArea'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import SizesAndQuantity from '../sizesAndQuantity/ui'
import {
	HeaderText,
	SaveButtonBlock,
	SizeAndQuantityVariantContainer,
	TitleAndPriceVariantContainer,
	TitleField,
} from '../styles'

import { AddImages } from '@/feautures/create-product'

export type SizeQuantityType = { size: string; quantity: string }

interface VariantProps {
	open: boolean
	handleClose: () => void
	onChange: (value: FormValues) => void
}

type ImageType = { image: File; main_image: boolean }

interface FormValues {
	title: string
	images: ImageType[]
	size_variants: SizeQuantityType[]
	description: string
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
		title: yup.string().required('Обязательное поле'),
		size_variants: yup.array().of(sizeQuantitySchema),
		description: yup.string().required('Введите информацию о модели'),
	})

const CreateVariantModal: FC<VariantProps> = ({
	open,
	handleClose,
	onChange,
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [imageUrls, setImageUrls] = useState<string[]>([])
	const id = (router.query?.id as string) || ''

	const formik = useFormik<FormValues>({
		initialValues: {
			title: '',
			images: [],
			size_variants: [{ size: '', quantity: '' }],
			description: '',
		},
		validationSchema: validationSchema(t),
		onSubmit: async (values, { resetForm }) => {
			try {
				onChange(values)
				resetForm()
				setImageUrls([])
				handleClose()
			} catch (error) {
				console.log(error)
			}
		},
	})

	const isMainImage = (index: number) => formik.values.images[index]?.main_image

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

	const onChangeFormik = async (
		name: string,
		value: SizeQuantityType[] | string
	) => formik.setFieldValue(name, value)

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
						error={formik.touched.title && Boolean(formik.errors.title)}
						errorMessage={formik.touched.title ? formik.errors.title : ''}
						value={formik.values.title}
						onChange={formik.handleChange}
						placeholder='Цвет варианта'
						name='title'
					/>
				</TitleAndPriceVariantContainer>

				<TitleField className='mt-8 mb-5'>Размеры и количество</TitleField>

				<SizeAndQuantityVariantContainer>
					<SizesAndQuantity
						value={formik.values.size_variants}
						onChange={onChangeFormik}
						touched={formik.touched.size_variants}
						error={formik.errors.size_variants}
					/>
				</SizeAndQuantityVariantContainer>

				<TitleField className='mt-16 mb-3'>
					Добавьте фотографии варианта продукта
				</TitleField>

				<AddImages
					value={formik.values.images}
					fieldTitle={'images'}
					onChange={(name: string, value: any) =>
						formik.setFieldValue(name, value)
					}
				/>

				<TextArea
					error={
						formik.touched.description && Boolean(formik.errors.description)
					}
					errorMessage={
						formik.touched.description ? formik.errors.description : ''
					}
					value={formik.values.description}
					onChange={formik.handleChange}
					placeholder='Дополнительная информация о модели'
					name='description'
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
