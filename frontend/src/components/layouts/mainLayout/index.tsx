import React, { FC, ReactNode } from 'react'
import Header from '../../headers/authHeader'
import { Main, MainWrapper } from './styles'

interface Props {
	children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
	return (
		<MainWrapper>
			<Header />
			<Main>{children}</Main>
		</MainWrapper>
	)
}

export default MainLayout
