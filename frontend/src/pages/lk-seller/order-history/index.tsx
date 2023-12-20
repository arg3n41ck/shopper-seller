import { OrdersHistoryMainSection } from '@/sections-pages/seller-ordersHistory'
import React from 'react'
import { LKSellerLayout } from 'src/widgets/layouts/lkSellerLayout'

const OrderHistory = () => {
  return (
    <LKSellerLayout>
      <OrdersHistoryMainSection />
    </LKSellerLayout>
  )
}

export default OrderHistory
