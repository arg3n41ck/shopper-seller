import React, { FC } from 'react'
import LogoIcon from '@/assets/icons/svg/LogoIcon'
import { NavContainer } from './styles'

const Header: FC = () => {
	return (
		<NavContainer>
			<LogoIcon />
		</NavContainer>
	)
}

export default Header
