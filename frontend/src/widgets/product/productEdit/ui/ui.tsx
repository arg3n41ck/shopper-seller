import React, { useState, useEffect, useMemo, FC, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'
import * as yup from 'yup'
import {
	ColumnsNameOfFieldsText,
	ColumnsOfFieldsContainer,
	HeadTitleOfPage,
	VariantButton,
	VariantsBlock,
} from './styles'
import TextField from '@/shared/ui/textField'
import CustomSelect from '@/shared/ui/select'
import Checkbox from '@/shared/ui/checkbox'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useTranslation } from 'react-i18next'
import Autocomplete from '@/shared/ui/autocomplete'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { fetchCategories } from '@/shared/store/slices/seller'
import { AddImages } from '@/feautures/create-product'
import { TextArea } from '@/shared/ui/textArea'
import { ProductDetailsField } from '@/widgets/lkSeller/myProducts'
import Button from '@/shared/ui/button'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { ButtonInfoCont } from '@/shared/styles/styles'
import { Check } from 'react-feather'

const sellerClient = new SellerClient()

interface SpecificationInput {
	title: string
	value: string
}
type VariantImageType = { image: File; main_image: boolean }

interface ProductEditPageProps {
	product: any
}

interface FormValues {
	title: string
	description: string
	gender: string
	for_kids: boolean
	price_from: string
	discount: string
	parent_category: string
	category: string
	country: string
	tags: string[]
	specifications: SpecificationInput[]
	publish_date: string
	recommendation: string
	sku: string

	variants: any
	images: any
}

type GenderType = {
	id: string
	name: string
	value: string
}

type SelectedOptionType = {
	[key: string]: string
}

const gender: GenderType[] = [
	{
		id: '1',
		name: 'Мужчина',
		value: 'MALE',
	},
	{
		id: '2',
		name: 'Женщина',
		value: 'FEMALE',
	},
]

const validationSchema = (t: (key: string) => string) =>
	yup.object({
		title: yup.string().required(t('Введите название продукта')),
		description: yup.string().required(t('Введите описание продукта')),
		gender: yup.string().required(t('Выберите пол')),
		for_kids: yup.boolean(),
		price_from: yup
			.number()
			.typeError(t('Цена должна быть числом'))
			.positive(t('Цена должна быть больше или равна 0'))
			.required(t('Введите цену продукта')),
		discount: yup
			.number()
			.min(0, t('Скидка должна быть не меньше 0'))
			.max(100, t('Скидка должна быть не больше 100')),
		// parent_category: yup.string().required(t('Выберите категорию продукта')),
		// category: yup.string().required(t('Выберите подкатегорию продукта')),
		recommendation: yup.string().required(t('Введите рекомендации по уходу')),
		tags: yup.array(),
		publish_date: yup.string(),
	})

const productData = [
	{
		title: 'Цвет 1',
		description: 'Описание для цвета 1',
	},
	{
		title: 'Цвет 2',
		description: 'Описание для цвета 2',
	},
	{
		title: 'Цвет 3',
		description: 'Описание для цвета 3',
	},
]

export const ProductEditPage: FC<ProductEditPageProps> = ({ product }) => {
	const { t } = useTranslation()
	const [selectedVariant, setSelectedVariant] = useState(0)
	const router = useRouter()
	const dispatch = useAppDispatch()
	const id = (router.query?.id as string) || ''
	const {
		categories,
		productDetailsChoice,
		// productDetailsMaterialChoice,
		productDetailsSizeChoice,
	} = useAppSelector(state => state.seller)
	const initialValuesRef = useRef(null)

	const handleVariantChange = (colorIndex: number) => {
		setSelectedVariant(colorIndex)
	}

	const formik = useFormik<FormValues>({
		initialValues: {
			title: '',
			description: '',
			gender: '',
			for_kids: false,
			price_from: '',
			discount: '',
			parent_category: '',
			category: '',
			country: '',
			tags: [],
			recommendation: '',
			specifications: [
				{ title: '', value: '' },
				{ title: '', value: '' },
			],
			publish_date: '',
			sku: '',

			variants: [],
			images: [],
		},

		innerRef: initialValuesRef,
		validationSchema: validationSchema(t),
		onSubmit: async (values, { resetForm }) => {
			try {
				console.log(values)
				// const { parent_category, variants, ...restValuesOfProduct } = values
				// const productData = removeEmptyFields({ ...restValuesOfProduct }, [
				// 	'for_kids',
				// 	'category',
				// ])
				// const responseProduct = await sellerClient.createProduct(productData)
				// if (Array.isArray(variants) && variants.length > 0) {
				// 	await Promise.all(
				// 		variants.map(async ({ images, ...restValuesOfVariant }) => {
				// 			const sizeVariants = restValuesOfVariant.size_variants.map(
				// 				(sizeVariant: any) => ({
				// 					...sizeVariant,
				// 					quantity: Number(sizeVariant.quantity),
				// 				})
				// 			)
				// 			const responseVariant = await sellerClient.createProductVariant({
				// 				product: responseProduct.id,
				// 				...restValuesOfVariant,
				// 				size_variants: sizeVariants,
				// 			})
				// 			await Promise.all(
				// 				images.map(async ({ image, main_image }: VariantImageType) => {
				// 					const formData = new FormData()
				// 					formData.append('image', image)
				// 					formData.append('variant', responseVariant.id)
				// 					const productVariantImage =
				// 						await sellerClient.createProductVariantImages({
				// 							formData,
				// 							main_image,
				// 						})
				// 					return productVariantImage
				// 				})
				// 			)
				// 		})
				// 	)
				// }
				// router.push({
				// 	pathname: PATH_LK_SELLER_CREATE_PRODUCT.step2,
				// 	query: { id: data.id },
				// })
				// resetForm()
			} catch (error) {
				console.log(error)
			}
		},
	})

	console.log({ images: formik.values.variants })

	const subcategories = useMemo(() => {
		return (
			categories.find(category => category.id === formik.values.parent_category)
				?.children || []
		)
	}, [formik])

	const handleFieldsValueChange = (fieldName: string, value: string) =>
		formik.setFieldValue(fieldName, value)
	// useEffect(() => {
	// 	// Update Formik's field values when selectedColor changes
	// 	formik.setValues({
	// 		title: productData[selectedColor]?.title || '',
	// 		description: productData[selectedColor]?.description || '',
	// 	})
	// }, [selectedColor])

	useEffect(() => {
		formik.setValues({
			title: product?.title || '',
			description: product?.description || '',
			gender: product?.gender || '',
			for_kids: product?.for_kids || false,
			price_from: product?.price_from || '',
			discount: product?.discount || '',
			parent_category: product?.parent_category || '',
			category: product?.category || '',
			country: product?.country || '',
			tags: product?.tags || [],
			recommendation: product?.recommendation || '',
			sku: product?.sku || '',
			specifications: product?.specifications || [
				{ title: '', value: '' },
				{ title: '', value: '' },
			],
			publish_date: product?.publish_date || '',
			variants: product?.variants || [],
			images: product?.images || [],
		})
	}, [product])

	// const formik = useFormik({
	// 	validationSchema,
	// 	initialValues: {
	// 		title: productData[selectedColor]?.title || '',
	// 		description: productData[selectedColor]?.description || '',
	// 	},
	// 	onSubmit: async (values, { resetForm }) => {
	// 		console.log(values)
	// 	},
	// })

	// console.log(selectedColor, formik.values)

	useEffect(() => {
		// dispatch(fetchCategories())
	}, [])

	return (
		<>
			<HeadTitleOfPage>Редактирование товара</HeadTitleOfPage>

			<VariantsBlock className='mt-10'>
				<p>Варианты</p>
				{/* <div> */}

				{product?.variants?.map((_: any, index: number) => (
					<VariantButton
						key={index}
						$active={selectedVariant === index}
						onClick={() => handleVariantChange(index)}
					>
						{index + 1}
					</VariantButton>
				))}
				{/* <VariantButton $active={false}>2</VariantButton>
				<VariantButton $active={false}>3</VariantButton>
				<VariantButton $active={false}>4</VariantButton> */}
				{/* </div> */}
			</VariantsBlock>

			<ColumnsOfFieldsContainer className='mt-[30px]'>
				<div>
					<ColumnsNameOfFieldsText>
						Основная информация{' '}
					</ColumnsNameOfFieldsText>

					<TextField
						error={formik.touched.title && Boolean(formik.errors.title)}
						errorMessage={formik.touched.title ? formik.errors.title : ''}
						value={formik.values.title}
						onChange={formik.handleChange}
						className={'mt-5'}
						name='title'
						placeholder={t('Название продукта')}
						label={t('Название продукта')}
					/>

					<TextField
						// error={formik.touched.title && Boolean(formik.errors.title)}
						// errorMessage={formik.touched.title ? formik.errors.title : ''}
						value={formik.values.variants[selectedVariant]?.title}
						onChange={formik.handleChange}
						className={'mt-5'}
						name={`variants[${selectedVariant}].title`}
						placeholder={t('Название варианта')}
						label={t('Название варианта')}
					/>

					<TextField
						error={formik.touched.sku && Boolean(formik.errors.sku)}
						errorMessage={formik.touched.sku ? formik.errors.sku : ''}
						value={formik.values.sku}
						onChange={formik.handleChange}
						className={'mt-5'}
						name='sku'
						placeholder={t('Артикль продукта')}
						label={t('Артикль продукта')}
					/>

					<CustomSelect
						placeholder={t('Пол')}
						inputLabel='Пол'
						value={formik.values.gender}
						error={formik.touched.gender && Boolean(formik.errors.gender)}
						errorMessage={formik.touched.gender ? formik.errors.gender : ''}
						options={gender}
						onChange={value => handleFieldsValueChange('gender', value)}
						fieldTitle='name'
						fieldValue='value'
						className={'mt-5 w-[50%]'}
					/>

					<Checkbox
						label={'Детская одежда'}
						checked={formik.values.for_kids}
						onChange={() =>
							formik.setFieldValue('for_kids', !formik.values.for_kids)
						}
						className={'mt-5'}
					/>

					<div className={'w-[100%] flex gap-[24px] mt-5'}>
						<TextField
							value={formik.values.price_from}
							error={
								formik.touched.price_from && Boolean(formik.errors.price_from)
							}
							errorMessage={
								formik.touched.price_from ? formik.errors.price_from : ''
							}
							onChange={formik.handleChange}
							name='price_from'
							placeholder={t('Цена')}
							label='Цена'
						/>

						<TextField
							value={formik.values.discount}
							error={formik.touched.discount && Boolean(formik.errors.discount)}
							errorMessage={
								formik.touched.discount ? formik.errors.discount : ''
							}
							onChange={formik.handleChange}
							placeholder={t('Скидка')}
							label={t('Скидка')}
							name='discount'
							helperText='не обязательно'
						/>
					</div>

					<div className={'w-[100%] flex gap-[24px] mt-5'}>
						<Autocomplete
							placeholder={t('Основная категория')}
							inputLabel={t('Основная категория')}
							options={categories}
							onChange={value => {
								handleFieldsValueChange('parent_category', value)
								formik.setFieldValue('category', '')
							}}
							value={formik.values.parent_category}
							// error={
							// 	formik.touched.parent_category &&
							// 	!!formik.errors.parent_category
							// }
							// errorMessage={
							// 	formik.touched.parent_category
							// 		? formik.errors.parent_category
							// 		: ''
							// }
							width='100%'
							fieldTitle='title'
							fieldValue='id'
						/>

						<Autocomplete
							placeholder={t('Подкатегория')}
							inputLabel={t('Подкатегория')}
							options={subcategories}
							onChange={value => handleFieldsValueChange('category', value)}
							value={formik.values.category}
							// error={formik.touched.category && Boolean(formik.errors.category)}
							// errorMessage={
							// 	formik.touched.category ? formik.errors.category : ''
							// }
							width='100%'
							fieldTitle='title'
							fieldValue='id'
						/>
					</div>

					<TextField
						className='mt-5'
						value={formik.values.country}
						error={formik.touched.country && Boolean(formik.errors.country)}
						errorMessage={formik.touched.country ? formik.errors.country : ''}
						onChange={formik.handleChange}
						placeholder={t('Страна производителя')}
						label={t('Страна производителя')}
						name='country'
						helperText='не обязательно'
					/>
				</div>

				<div>
					<ColumnsNameOfFieldsText>изображения товара</ColumnsNameOfFieldsText>

					<AddImages
						value={formik.values.variants[selectedVariant]?.images}
						fieldTitle={`variants[${selectedVariant}].images`}
						className='mt-5'
						onChange={(name: string, value: any) =>
							formik.setFieldValue(name, value)
						}
					/>

					<ColumnsNameOfFieldsText className='mt-10'>
						Дополнительная информация{' '}
					</ColumnsNameOfFieldsText>

					<TextArea
						// error={
						// 	formik.touched.description && Boolean(formik.errors.description)
						// }
						// errorMessage={
						// 	formik.touched.description ? formik.errors.description : ''
						// }
						value={formik.values.variants[selectedVariant]?.description}
						onChange={formik.handleChange}
						placeholder='Дополнительная информация о модели'
						label={t('Дополнительная информация о модели')}
						name={`variants[${selectedVariant}].description`}
						className={'mt-5'}
					/>

					<TextArea
						value={formik.values.description}
						error={
							formik.touched.description && Boolean(formik.errors.description)
						}
						errorMessage={
							formik.touched.description ? formik.errors.description : ''
						}
						onChange={formik.handleChange}
						placeholder={t('Описание товара')}
						label={t('Описание товара')}
						name='description'
						className={'mt-5'}
					/>

					<ProductDetailsField
						formik={formik}
						fieldName='specifications'
						className={'mt-5'}
					/>
				</div>
			</ColumnsOfFieldsContainer>

			{/* <div>
				{productData.map((color, index) => (
					<button key={index} onClick={() => handleColorChange(index)}>
						{index + 1}
					</button>
				))}
			</div>

			<div>
				<label htmlFor='title'>Заголовок</label>
				<input
					type='text'
					id='title'
					name='title'
					value={formik.values.title}
					onChange={formik.handleChange}
				/>
			</div>

			<div>
				<label htmlFor='description'>Описание</label>
				<input
					type='text'
					id='description'
					name='description'
					value={formik.values.description}
					onChange={formik.handleChange}
				/>
			</div>

			<button type='submit'>Сохранить</button> */}

			<Button
				variant={BUTTON_STYLES.primaryCta}
				className='max-w-[184px] mx-auto'
				onClick={() => formik.handleSubmit()}
				type='button'
			>
				<ButtonInfoCont>
					Готово
					<Check />
				</ButtonInfoCont>
			</Button>
		</>
	)
}
