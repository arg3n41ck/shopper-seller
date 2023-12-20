import { OrderDetailSection } from '@/sections-pages/seller-ordersHistory'
import { SellerClient } from '@/shared/apis/sellerClient'
import { LKSellerLayout } from '@/widgets/layouts'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const sellerClient = new SellerClient()

const OrderDetail = () => {
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const [isQueryEnabled, setIsQueryEnabled] = useState(false)

  useEffect(() => {
    if (id) {
      setIsQueryEnabled(true)
    }
  }, [id])

  const { data } = useQuery(['order', id], () => sellerClient.fetchOrder(+id), {
    enabled: isQueryEnabled,
  })

  return (
    <LKSellerLayout>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <OrderDetailSection order={data} />
    </LKSellerLayout>
  )
}

export default OrderDetail
