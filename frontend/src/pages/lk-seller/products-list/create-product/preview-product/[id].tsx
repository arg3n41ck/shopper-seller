import { $apiProductsApi } from '@/shared/api'
import { PreviewProductPage } from '@/widgets/product'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LKSellerLayout } from 'src/widgets/layouts/lkSellerLayout'

const fetchProduct = async (slug: string) => {
  const { data } = await $apiProductsApi.productsSellerProductsRead(slug)
  return data
}

const PreviewProduct = () => {
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
      <PreviewProductPage product={data} />
    </LKSellerLayout>
  )
}

export default PreviewProduct
