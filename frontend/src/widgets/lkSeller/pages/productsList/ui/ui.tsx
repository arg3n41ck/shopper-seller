import React, { FC } from 'react'
import LKSellerLayout from '@/components/layouts/lkSellerLayout'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/routes/paths'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import { useRouter } from 'next/router'
import { Plus } from 'react-feather'
import { LKSellerContainerWithBackground } from '../../styles'
import {
	MyProductsFiltersAndButtonContainer,
	MyProductsHeaderText,
	ProductsContainer,
} from './styles'

export const MyProductsPage: FC = () => {
	const router = useRouter()

	const navigateToCreateProduct = () =>
		router.push({ pathname: PATH_LK_SELLER_CREATE_PRODUCT.step1 })

	return (
		<LKSellerLayout>
			<LKSellerContainerWithBackground>
				<ProductsContainer>
					<MyProductsHeaderText>Список товаров</MyProductsHeaderText>

					<MyProductsFiltersAndButtonContainer>
						<Button
							onClick={navigateToCreateProduct}
							variant={BUTTON_STYLES.primaryCta}
							size='large'
						>
							<ButtonInfoCont>
								Добавить товар
								<Plus />
							</ButtonInfoCont>
						</Button>
					</MyProductsFiltersAndButtonContainer>
				</ProductsContainer>
			</LKSellerContainerWithBackground>
		</LKSellerLayout>
	)
}
