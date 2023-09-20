import React, { FC, useEffect, useState } from 'react'
import { steps } from '@/components/layouts/createProductLayout'
import { StepBlock } from '@/components/layouts/createProductLayout/styles'
import { SellerClient } from '@/shared/apis/sellerClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/routes/paths'
import { fetchProduct } from '@/shared/store/slices/seller'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import Checkbox from '@/shared/ui/checkbox'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { Calendar, ChevronRight, Clock } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import { MyProductCreateHeaderText, ProductsContainer } from '../../../styles'
import { InfoAboutProductWrapper } from '../../firstStep/styles'
import CreateProductPaginationSlot from '../../slots/createProductStepPagination/ui'
import CreateProductSubmitButtonSlot from '../../slots/createProductSubmitButtonSlot/ui'
import { CheckboxBlock, TextFieldsContainer } from './styles'

interface FormValues {
	date: string
	time: string
}

const sellerClient = new SellerClient()

const PublicationDateProduct: FC = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { product } = useAppSelector(state => state.seller)
	const [publishByDate, setPublishByDate] = useState<boolean>(false)
	const id = (router.query?.id as string) || ''

	const formik = useFormik<FormValues>({
		initialValues: {
			date: '',
			time: '',
		},
		onSubmit: async (values, { resetForm }) => {
			if (publishByDate) {
				try {
					const datetime = `${values.date}T${values.time}`

					const body = {
						published_date: datetime,
					}

					await sellerClient.editProduct({ id, body })
					router.push({
						pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
						query: { id },
					})
				} catch (error) {
					console.log(error)
				}
			} else {
				router.push({
					pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
					query: { id },
				})
			}
		},
	})

	const setSellerCreateProductFieldsInfo = async () => {
		const [date, time] = product.published_date.split('T')

		const values = {
			date: date || '',
			time: time || '',
		}

		formik.setValues(values)
		setPublishByDate(true)
	}

	const handleChangePublishByDate = () => setPublishByDate(prev => !prev)

	useEffect(() => {
		id && dispatch(fetchProduct(id))
	}, [])

	useEffect(() => {
		id && product?.published_date && setSellerCreateProductFieldsInfo()
	}, [id, product])

	return (
		<ProductsContainer>
			<InfoAboutProductWrapper>
				<MyProductCreateHeaderText>
					Шаг 3: Дата публикации
				</MyProductCreateHeaderText>
				<CheckboxBlock>
					<Checkbox
						label={<Trans i18nKey={'Опубликовать к определенной дате'} />}
						checked={publishByDate}
						onChange={handleChangePublishByDate}
					/>
				</CheckboxBlock>

				{publishByDate && (
					<TextFieldsContainer>
						<TextField
							// error={formik.touched.product_name && Boolean(formik.errors.product_name)}
							// errorMessage={formik.touched.product_name ? formik.errors.product_name : ''}
							value={formik.values.date}
							onChange={formik.handleChange}
							placeholder='01.01.2023'
							name='date'
							endAdornment={<Calendar />}
							type='date'
						/>

						<TextField
							// error={formik.touched.product_name && Boolean(formik.errors.product_name)}
							// errorMessage={formik.touched.product_name ? formik.errors.product_name : ''}
							value={formik.values.time}
							onChange={formik.handleChange}
							placeholder='12:00'
							name='time'
							endAdornment={<Clock />}
							type='time'
						/>
					</TextFieldsContainer>
				)}

				<CreateProductPaginationSlot>
					{steps.map((step, index) => (
						<StepBlock
							key={index}
							className={router.pathname === step.path ? 'active' : ''}
							onClick={() =>
								id && router.push({ pathname: step.path, query: { id } })
							}
						/>
					))}
				</CreateProductPaginationSlot>

				<CreateProductSubmitButtonSlot>
					<Button
						onClick={formik.handleSubmit}
						variant={BUTTON_STYLES.primaryCta}
						type='submit'
					>
						<ButtonInfoCont>
							Продолжить
							<ChevronRight />
						</ButtonInfoCont>
					</Button>
				</CreateProductSubmitButtonSlot>
			</InfoAboutProductWrapper>
		</ProductsContainer>
	)
}

export default PublicationDateProduct
