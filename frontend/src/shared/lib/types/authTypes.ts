type TypeSignUpBuyer = {
	first_name: string
	last_name: string
	email?: string
	birth_date: string
	password: string
	preferred_clothing: string
	notifications_enabled?: boolean
	privacy_and_terms?: boolean
}

type TypeCheckUserByEmail = {
	email: string
}

type TypeLogIn = { username: string; password: string }

type TypeSignUpSeller = {
	email?: string
	shop_name: string
	password: string
	store_specialization: string
	notifications_enabled?: boolean
	privacy_and_terms?: boolean
}

type TypeResetPassword = {
	token: string
	new_password: string
}

type TypeChangeEmail = {
	email: string
	password: string
}

type TypeChangePassword = {
	old_password: string
	new_password: string
}

type TypeLogOut = {
	user_id: string | undefined
}

type TypeUser = {
	id: string
	email: string
	seller: {
		shop_name: string
	} | null
	buyer: {
		fist_name: string
		last_name: string
	} | null
	user_type: string
}

export type {
	TypeChangeEmail,
	TypeChangePassword,
	TypeCheckUserByEmail,
	TypeLogIn,
	TypeLogOut,
	TypeResetPassword,
	TypeSignUpBuyer,
	TypeSignUpSeller,
	TypeUser,
}
