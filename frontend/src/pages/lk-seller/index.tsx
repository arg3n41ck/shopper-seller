import LKSellerLayout from '@/components/Layouts/LKSellerLayout'
import { FC } from 'react'
import { HeadTextOfPage } from './styles'

const LKSeller: FC = () => {
	return (
		<LKSellerLayout>
			<HeadTextOfPage>Здравствуйте!</HeadTextOfPage>
		</LKSellerLayout>
	)
}

export default LKSeller
