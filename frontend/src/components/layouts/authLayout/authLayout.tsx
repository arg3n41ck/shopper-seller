import Header from '@/components/headers/authHeader'
import { FC, ReactNode } from 'react'
import { MainWrapper, OutletWrapper } from './styles'

interface AuthLayout {
	children: ReactNode
}

const AuthLayout: FC<AuthLayout> = ({ children }) => {
	return (
		<MainWrapper>
			<Header />
			<OutletWrapper>{children}</OutletWrapper>
		</MainWrapper>
	)
}

export default AuthLayout
