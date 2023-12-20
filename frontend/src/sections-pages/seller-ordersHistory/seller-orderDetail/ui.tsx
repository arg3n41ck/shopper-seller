import React, { FC } from 'react'
import { OrderCard } from './components/orderCard'
import { ArrowLeft } from 'react-feather'
import { ProductInOrderCard } from './components/productInOrderCard'
import { useRouter } from 'next/router'
import { PATH_LK_SELLER } from '@/shared/config'
import { Order } from '@/shared/api/gen'
import { OrderDetailRefundProducts } from './components/refundProducts'

interface TypeOrderDetailSectionProps {
  order: Order
}

export const OrderDetailSection: FC<TypeOrderDetailSectionProps> = ({ order }) => {
  const router = useRouter()

  const navigateToOrderHistory = () => router.push(PATH_LK_SELLER.orderHistory)

  if (!order) return null

  return (
    <>
      <div onClick={navigateToOrderHistory} className="mb-10 inline-flex cursor-pointer items-center gap-[18px]">
        <ArrowLeft />
        <p className="text-lg font-medium text-neutral-900">К заказам</p>
      </div>

      <OrderCard order={order}>
        {!!order?.refunds?.length && <OrderDetailRefundProducts order={order} />}

        {!!order?.refunds?.length && <div className="border border-[#DBDBDB]" />}

        <div className="flex flex-col items-start justify-start gap-5 p-5">
          {!!order?.refunds?.length && <p className="text-lg font-medium uppercase text-neutral-900">Товары</p>}

          {order.items?.map((product) => <ProductInOrderCard product={product} key={product.id} />)}
        </div>
      </OrderCard>
    </>
  )
}
