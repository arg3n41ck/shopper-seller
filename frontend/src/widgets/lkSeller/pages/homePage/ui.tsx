import React, { FC } from 'react'
import LKSellerLayout from '@/components/layouts/lkSellerLayout'
import { HeadTextOfPage } from '../styles'

export const LKSellerHomePage: FC = () => {
	return (
		<LKSellerLayout>
			<HeadTextOfPage>Здравствуйте!</HeadTextOfPage>
		</LKSellerLayout>
	)
}
