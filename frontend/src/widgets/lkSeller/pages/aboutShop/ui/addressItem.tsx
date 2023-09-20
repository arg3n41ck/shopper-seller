import React, { FC, useState } from 'react'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { Check, Edit2, MapPin, Phone, Trash2 } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import {
	AddressContainer,
	AddressEditIcons,
	AddressFieldsInfo,
	AddressHeaderInfo,
	AddressHeaderText,
	FieldInfo,
	FieldName,
	FieldsCont,
} from './styles'

import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { TypeAddressData } from '@/shared/lib/types/sellerTypes'
import { fetchBranches } from '@/shared/store/slices/seller'
import { isEqual } from 'lodash'
import { DeleteAddressBackdrop } from './modals/deleteAddressBackboard'

interface Props {
	data: TypeAddressData
	showEdit: boolean
	onOpen: (id: string) => void
	onClose: (id: string) => void
	requestAddress: (value: TypeAddressData) => void
	action: 'create' | 'edit'
	deleteAddress?: (id: string) => void
}

interface FormValues {
	address: string
	phone_number: string
}

const validationSchema = (t: (key: string) => string) =>
	yup.object({
		address: yup.string(),
		phone_number: yup
			.string()
			.test(
				'phone_number',
				'Номер телефона должен быть в формате +996555667788',
				value => {
					if (!value) {
						return false
					}
					const phoneNumberRegex = /^\+996\d{9}$/
					return phoneNumberRegex.test(value)
				}
			),
	})

export const AddressItem: FC<Props> = ({
	data,
	showEdit,
	onOpen,
	onClose,
	requestAddress,
	action,
	deleteAddress,
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false)

	const formik = useFormik<FormValues>({
		initialValues: {
			address: data.address || '',
			phone_number: data.phone_number || '+996',
		},
		validationSchema: validationSchema(t),
		onSubmit: async (values, { resetForm }) => {
			const { address, phone_number } = values

			if (isEqual(values, formik.initialValues) || !address || !phone_number) {
				onClose(data.id)
				return
			}

			try {
				await requestAddress({ id: data.id, ...values })
				await dispatch(fetchBranches())
				onClose(data.id)
				resetForm()
			} catch (error) {
				console.log(error)
			}
		},
	})

	const handleShowBackdrop = () => setShowDeleteBackdrop(prev => !prev)

	const deleteAddressById = async () => {
		if (deleteAddress) await deleteAddress(data.id)
	}

	return (
		<>
			<AddressContainer className={`${showEdit ? 'active' : ''}`}>
				<AddressHeaderInfo>
					<AddressHeaderText>Филиал</AddressHeaderText>
					<AddressEditIcons>
						{!showEdit ? (
							<Edit2 onClick={() => onOpen(data.id)} cursor='pointer' />
						) : (
							<>
								{action === 'edit' && (
									<Trash2 onClick={handleShowBackdrop} cursor='pointer' />
								)}
								<Check
									cursor='pointer'
									onClick={() => {
										formik.handleSubmit()
									}}
								/>
							</>
						)}
					</AddressEditIcons>
				</AddressHeaderInfo>

				<AddressFieldsInfo>
					{!showEdit ? (
						<>
							<FieldsCont>
								<FieldName>Адрес</FieldName>
								<FieldInfo>{data.address}</FieldInfo>
							</FieldsCont>
							<FieldsCont>
								<FieldName>Телефон</FieldName>
								<FieldInfo>{data.phone_number}</FieldInfo>
							</FieldsCont>
						</>
					) : (
						<>
							<TextField
								label='Адрес'
								value={formik.values.address}
								onChange={formik.handleChange}
								name='address'
								error={formik.touched.address && Boolean(formik.errors.address)}
								errorMessage={
									formik.touched.address && formik.errors.address
										? formik.errors.address
										: ''
								}
								endAdornment={<MapPin />}
							/>
							<TextField
								label='Телефон'
								error={
									formik.touched.phone_number &&
									Boolean(formik.errors.phone_number)
								}
								errorMessage={
									formik.touched.phone_number && formik.errors.phone_number
										? formik.errors.phone_number
										: ''
								}
								value={formik.values.phone_number}
								onChange={formik.handleChange}
								endAdornment={<Phone />}
								name='phone_number'
							/>
						</>
					)}
				</AddressFieldsInfo>
			</AddressContainer>

			{/* //? Backdrop */}

			{showDeleteBackdrop && (
				<DeleteAddressBackdrop
					open={showDeleteBackdrop}
					onClose={handleShowBackdrop}
					deleteAddress={deleteAddressById}
				/>
			)}
		</>
	)
}
