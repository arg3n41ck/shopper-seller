import React, { useEffect, useState } from 'react'
import { SellerClient } from '@/shared/apis/sellerClient'
import { LKSellerLayout } from '@/widgets/layouts'
import { ProductEditPage } from '@/widgets/product'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const sellerClient = new SellerClient()

const ProductDetail = () => {
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const [isQueryEnabled, setIsQueryEnabled] = useState(false)

  useEffect(() => {
    if (id) {
      setIsQueryEnabled(true)
    }
  }, [id])

  const { data } = useQuery(['product', id], () => sellerClient.fetchProduct(id), {
    enabled: isQueryEnabled,
  })

  return (
    <LKSellerLayout>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <ProductEditPage product={data} />
    </LKSellerLayout>
  )
}

export default ProductDetail
