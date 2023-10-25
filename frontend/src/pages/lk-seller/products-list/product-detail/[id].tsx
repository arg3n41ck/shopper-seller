import { LKSellerLayout } from '@/widgets/layouts'
import { ProductDetailPage } from '@/widgets/product'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ProductDetail = () => {
  // const router = useRouter()
  // const id = (router.query?.id as string) || ''
  // const dispatch = useAppDispatch()
  // const { product } = useAppSelector(state => state.seller)

  // useEffect(() => {
  // 	id && dispatch(fetchProduct(id))
  // }, [id])

  return (
    <LKSellerLayout>
      <ProductDetailPage product={product} />
    </LKSellerLayout>
  )
}

export default ProductDetail
