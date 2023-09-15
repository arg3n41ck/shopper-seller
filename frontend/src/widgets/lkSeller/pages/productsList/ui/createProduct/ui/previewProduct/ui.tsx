import CreateProductLayout from '@/components/layouts/createProductLayout'
import LKSellerLayout from '@/components/layouts/lkSellerLayout'
import { PreviewProduct } from '@/widgets/lkSeller'

export const PreviewProductPage = () => {
	return (
		<LKSellerLayout>
			<CreateProductLayout>
				<PreviewProduct />
			</CreateProductLayout>
		</LKSellerLayout>
	)
}
