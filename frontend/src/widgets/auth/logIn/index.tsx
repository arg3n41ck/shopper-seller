import React, { FC, useState } from 'react'
import AuthLayout from '@/components/layouts/authLayout/authLayout'
import ShowAndHideIcon from '@/components/passwordShowAndHideIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { setLocalStorageValues } from '@/shared/lib/hooks/useLocalStorage'
import { TypeLogIn } from '@/shared/lib/types/authTypes'
import { PATH_AUTH, PATH_LK_SELLER } from '@/shared/routes/paths'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import LoaderIcon from '@/shared/ui/loader'
import TextField from '@/shared/ui/textField'
import { fetchMe } from '@/store/slices/user'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { ArrowRight } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { TextFieldCont } from '../styles'
import {
	DescriptionText,
	ForgetThePassword,
	FormContainer,
	LoginContainer,
	LoginPageText,
	MainInfoTextsContainer,
	MainText,
	NameOfProjectText,
	TextWithIconContainer,
	TextWithIconText,
} from './styles'

const authClient = new AuthClient()

interface IFormErrors {
	username?: string
	password?: string
}

const validationSchema = (t: (key: string) => string) =>
	yup.object({
		username: yup
			.string()
			.email(t('auth.validation.email.invalid'))
			.required(t('auth.validation.email.required')),
		password: yup.string().required(t('auth.validation.password.required')),
	})

export const LoginPage: FC = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const email = (router.query?.email as string) || ''
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const formik = useFormik<TypeLogIn>({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema(t),
		onSubmit: async values => {
			setIsLoading(true)
			try {
				const loginResponse = await authClient.login(values)

				setLocalStorageValues({
					access_token: loginResponse.access_token,
					refresh_token: loginResponse.refresh_token,
				})

				const { payload } = await dispatch(fetchMe())
				const isSeller = payload?.user_type === 'seller'

				setIsLoading(false)
				router.push({
					pathname: PATH_AUTH.authSuccess,
					query: {
						title: t('auth.logIn.welcome'),
						path: isSeller ? PATH_LK_SELLER.root : PATH_AUTH.root,
					},
				})
			} catch (error: any) {
				setIsLoading(false)
				if (error.response && error.response.status === 400) {
					const { data } = error.response
					const formErrors: IFormErrors = {}

					if (data?.detail) {
						formErrors.username = t('auth.validation.password.error') as string
						formErrors.password = t('auth.validation.password.error') as string
					}

					formik.setErrors(formErrors)
				}
			}
		},
	})

	const navigateToNewPassword = () => {
		router.push({
			pathname: PATH_AUTH.resetPassword,
			query: { email: formik.values.username },
		})
	}

	const navigateToSignUp = () => {
		router.push({ pathname: PATH_AUTH.signUp })
	}

	return (
		<AuthLayout>
			<LoginContainer>
				<MainInfoTextsContainer>
					<MainText>СТАНЬ ПАРТНЕРОМ</MainText>
					<NameOfProjectText>SHOPPER</NameOfProjectText>
					<DescriptionText>
						{' '}
						SHOPPER - партнер которого выбирают миллионы
					</DescriptionText>

					<TextWithIconContainer className={'mt-[40px]'}>
						<TextWithIconText>Подробнее</TextWithIconText>
						<ArrowRight />
					</TextWithIconContainer>
				</MainInfoTextsContainer>

				<FormContainer>
					<LoginPageText>Добро пожаловать!</LoginPageText>

					<form onSubmit={formik.handleSubmit}>
						<TextFieldCont>
							<TextField
								placeholder={t('auth.fields.email')}
								error={
									formik.touched.username && Boolean(formik.errors.username)
								}
								errorMessage={
									formik.touched.username && formik.errors.username
										? formik.errors.username
										: ''
								}
								value={formik.values.username}
								onChange={formik.handleChange}
								name='username'
							/>

							<TextField
								placeholder={t('auth.fields.password')}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								errorMessage={
									formik.touched.password && formik.errors.password
										? formik.errors.password
										: ''
								}
								value={formik.values.password}
								onChange={formik.handleChange}
								name='password'
								type={showPassword ? 'text' : 'password'}
								endAdornment={ShowAndHideIcon({
									show: showPassword,
									onHide: () => setShowPassword(prev => !prev),
									onShow: () => setShowPassword(prev => !prev),
								})}
							/>

							<ForgetThePassword onClick={navigateToNewPassword}>
								<Trans i18nKey={'auth.logIn.forgetThePassword'} />
							</ForgetThePassword>
						</TextFieldCont>

						<Button type='submit' disabled={isLoading} className={'mt-[20px]'}>
							<ButtonInfoCont>
								<Trans i18nKey={'Войти'} />{' '}
								<LoaderIcon loading={isLoading} size={24} />
							</ButtonInfoCont>
						</Button>
					</form>

					<LoginPageText>Новый партнер?</LoginPageText>

					<Button
						type='button'
						variant={BUTTON_STYLES.withoutBackground}
						onClick={navigateToSignUp}
					>
						<ButtonInfoCont>
							<Trans i18nKey={'Зарегестрироваться'} />
						</ButtonInfoCont>
					</Button>
				</FormContainer>
			</LoginContainer>
		</AuthLayout>
	)
}
