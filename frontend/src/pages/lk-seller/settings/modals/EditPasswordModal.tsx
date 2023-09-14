import ShowAndHideIcon from '@/components/PasswordShowAndHideIcon'
import { ButtonInfoCont } from '@/pages/auth/styles'
import { AuthClient } from '@/shared/apis/authClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { fetchMe } from '@/shared/store/slices/user'
import Button from '@/shared/ui/button'
import LoaderIcon from '@/shared/ui/loader'
import Modal from '@/shared/ui/modal'
import {
	HeaderTextModal,
	HeaderTextsModalCont,
	ModalInnerContainer,
	TextModal,
} from '@/shared/ui/modal/styles'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const authClient = new AuthClient()

interface IFormErrors {
	[key: string]: string
}

interface IFormValues {
	old_password: string
	new_password: string
	repeat_password: string
}

const validationSchema = (t: (key: string) => string) =>
	yup.object({
		old_password: yup.string().required('Обязательно брат'),
		new_password: yup
			.string()
			.required('Обязательно брат')
			.min(8, t('auth.validation.password.minLength')),
		repeat_password: yup
			.string()
			.required('Повтори пароль брат')
			.oneOf([yup.ref('new_password')], 'Не совпадает брат'),
	})

interface Props {
	open: boolean
	onClose: () => void
}

const EditEmailModal: FC<Props> = ({ open, onClose }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState({
		old_password: false,
		new_password: false,
		repeat_password: false,
	})

	const formik = useFormik<IFormValues>({
		initialValues: {
			old_password: '',
			new_password: '',
			repeat_password: '',
		},
		validationSchema: validationSchema(t),
		onSubmit: async ({ new_password, old_password }, { resetForm }) => {
			setIsLoading(true)
			try {
				await authClient.changePassword({ new_password, old_password })
				await dispatch(fetchMe())
				setIsLoading(false)
				onClose()
				resetForm()
			} catch (error: any) {
				setIsLoading(false)
				if (error.response && error.response.status === 400) {
					const { data } = error.response
					const formErrors: IFormErrors = {}

					if (data?.detail) {
						formErrors.old_password = 'Неверно введённый пароль'
					}

					formik.setErrors(formErrors)
				}
			}
		},
	})

	const handleShowPassword = (field: keyof typeof showPassword) => {
		setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
	}

	const handleClose = () => {
		formik.resetForm()
		onClose()
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<ModalInnerContainer>
				<HeaderTextsModalCont>
					<HeaderTextModal>Измените ваш пароль</HeaderTextModal>
					<TextModal>
						Вы можете обновить ваш пароль в любое время чтобы хранить ваш
						Shopper аккаунт защищенным.
					</TextModal>
				</HeaderTextsModalCont>

				<form onSubmit={formik.handleSubmit}>
					<div className='flex flex-col gap-8 mt-9 mb-12'>
						<div className='flex flex-col gap-8'>
							<TextField
								placeholder={t('Пароль')}
								error={
									formik.touched.old_password &&
									Boolean(formik.errors.old_password)
								}
								errorMessage={
									formik.touched.old_password && formik.errors.old_password
										? formik.errors.old_password
										: ''
								}
								value={formik.values.old_password}
								onChange={formik.handleChange}
								name='old_password'
								type={showPassword.old_password ? 'text' : 'password'}
								endAdornment={ShowAndHideIcon({
									show: showPassword.old_password,
									onHide: () => handleShowPassword('old_password'),
									onShow: () => handleShowPassword('old_password'),
								})}
							/>

							<TextField
								placeholder={t('Новый пароль')}
								error={
									formik.touched.new_password &&
									Boolean(formik.errors.new_password)
								}
								errorMessage={
									formik.touched.new_password && formik.errors.new_password
										? formik.errors.new_password
										: ''
								}
								value={formik.values.new_password}
								onChange={formik.handleChange}
								name='new_password'
								type={showPassword.new_password ? 'text' : 'password'}
								endAdornment={ShowAndHideIcon({
									show: showPassword.new_password,
									onHide: () => handleShowPassword('new_password'),
									onShow: () => handleShowPassword('new_password'),
								})}
							/>

							<TextField
								placeholder={t('Подтвердите пароль')}
								error={
									formik.touched.repeat_password &&
									Boolean(formik.errors.repeat_password)
								}
								errorMessage={
									formik.touched.repeat_password &&
									formik.errors.repeat_password
										? formik.errors.repeat_password
										: ''
								}
								value={formik.values.repeat_password}
								onChange={formik.handleChange}
								name='repeat_password'
								type={showPassword.repeat_password ? 'text' : 'password'}
								endAdornment={ShowAndHideIcon({
									show: showPassword.repeat_password,
									onHide: () => handleShowPassword('repeat_password'),
									onShow: () => handleShowPassword('repeat_password'),
								})}
							/>
						</div>
					</div>

					<div className='flex justify-center'>
						<Button variant={BUTTON_STYLES.primaryCta}>
							<ButtonInfoCont>
								Сохранить
								<LoaderIcon loading={isLoading} size={24} />
							</ButtonInfoCont>
						</Button>
					</div>
				</form>
			</ModalInnerContainer>
		</Modal>
	)
}

export default EditEmailModal
