import LKSellerLayout from '@/components/layouts/lkSellerLayout'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { fetchProduct } from '@/shared/store/slices/seller'
import { ProductEditPage } from '@/widgets/lkSeller'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

const ProductEdit: FC = () => {
	const router = useRouter()
	const id = (router.query?.id as string) || ''
	const dispatch = useAppDispatch()
	const { product } = useAppSelector(state => state.seller)

	useEffect(() => {
		id && dispatch(fetchProduct(id))
	}, [id])

	return (
		<LKSellerLayout>
			<ProductEditPage product={product} />
		</LKSellerLayout>
	)
}

export default ProductEdit
