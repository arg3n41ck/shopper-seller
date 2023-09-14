import {
	getLocalStorageValues,
	removeFieldsFromLocalStorage,
} from '@/shared/lib/hooks/useLocalStorage'
import {
	TypeChangeEmail,
	TypeChangePassword,
	TypeCheckUserByEmail,
	TypeLogIn,
	TypeLogOut,
	TypeResetPassword,
	TypeSignUpBuyer,
	TypeSignUpSeller,
	TypeUser,
} from '@/shared/lib/types/authTypes'
import ApiClient from '../api/apiClient'

export class AuthClient {
	async checkUserByEmail({ email }: TypeCheckUserByEmail): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>(`/auth/user-exists/`, {
				email,
			})
			return data
		} catch (error) {
			throw error
		}
	}

	async checkUserByEmailForResetPassword({
		email,
	}: TypeCheckUserByEmail): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>(
				`/auth/password-reset-request/`,
				{ email }
			)
			return data
		} catch (error) {
			throw error
		}
	}

	async login(body: TypeLogIn): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>('/accounts/auth/token/', body)
			return data
		} catch (error) {
			throw error
		}
	}

	async registerBuyer(body: TypeSignUpBuyer): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>('/users/register/buyer/', body)
			return data
		} catch (error) {
			throw error
		}
	}

	async registerSeller(body: TypeSignUpSeller): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>(
				'/users/register/seller/',
				body
			)
			return data
		} catch (error) {
			throw error
		}
	}

	async resetPassword(body: TypeResetPassword): Promise<any> {
		try {
			const { data } = await ApiClient.post<any>('/auth/password-reset/', body)
			return data
		} catch (error) {
			throw error
		}
	}

	async changePassword(body: TypeChangePassword): Promise<any> {
		try {
			const { data } = await ApiClient.patch<any>(
				'/users/settings/change-password/',
				body
			)
			return data
		} catch (error) {
			throw error
		}
	}

	async changeEmail(body: TypeChangeEmail): Promise<any> {
		try {
			const { data } = await ApiClient.patch<any>(
				'/users/settings/change-email/',
				body
			)
			return data
		} catch (error) {
			throw error
		}
	}

	async logOut({ user_id }: TypeLogOut): Promise<void> {
		const tokens = getLocalStorageValues(['access_token', 'refresh_token'])

		const body = {
			user_id,
			...tokens,
		}

		try {
			await ApiClient.post<any>('/auth/logout/', body)
			removeFieldsFromLocalStorage(['access_token', 'refresh_token'])
		} catch (error) {
			throw error
		}
	}

	async getMe(): Promise<TypeUser> {
		try {
			const { data } = await ApiClient.get<TypeUser>('/users/me/')
			return data
		} catch (error) {
			throw error
		}
	}
}
