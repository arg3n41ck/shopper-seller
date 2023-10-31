import { $apiProductsApi } from '@/shared/api'
import { LKSellerLayout } from '@/widgets/layouts'
import { ProductDetailPage } from '@/widgets/product'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const fetchProduct = async (slug: string) => {
  const { data } = await $apiProductsApi.productsSellerProductsRead(slug)
  return data
}

const ProductDetail = () => {
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const [isQueryEnabled, setIsQueryEnabled] = useState(false)

  useEffect(() => {
    if (id) {
      setIsQueryEnabled(true)
    }
  }, [id])

  const { data } = useQuery(['product', id], () => fetchProduct(id), {
    enabled: isQueryEnabled,
  })

  return (
    <LKSellerLayout>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <ProductDetailPage product={data} />
    </LKSellerLayout>
  )
}

export default ProductDetail
