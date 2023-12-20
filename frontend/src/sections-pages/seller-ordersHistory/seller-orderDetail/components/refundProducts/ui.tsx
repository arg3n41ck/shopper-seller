import React, { FC } from 'react'
import { Order } from '@/shared/api/gen'
import Image from 'next/image'
import { ProductInOrderCard } from '../productInOrderCard'

interface TypeOrderDetailRefundProductsProps {
  order: Order
}

export const OrderDetailRefundProducts: FC<TypeOrderDetailRefundProductsProps> = ({ order }) => {
  return (
    <div className="p-5">
      <div className="mb-2 flex items-start gap-2">
        <p className="text-lg font-medium uppercase text-neutral-900">Товары к возврату</p>
        <p className="text-lg font-medium uppercase text-stone-500">{order.refunds?.length}</p>
      </div>

      {!!order.refunds?.length &&
        order.refunds.map((refund, index) => (
          <div key={index} className="border-b border-zinc-300">
            <div className="flex w-full flex-col gap-2">
              <p className="text-base font-normal text-neutral-900">Причина возврата: {refund.title}</p>

              <p className="text-base font-normal text-neutral-900">Комментарий: {refund.description}</p>

              {!!refund?.images?.length && (
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal text-neutral-900">Фото:</p>

                  <div className="flex flex-wrap items-center gap-2">
                    {refund?.images.map((image) => (
                      <Image
                        src={image.image || '/images/mock/child.png'}
                        width={40}
                        height={40}
                        alt={'refund image'}
                        key={image.id}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-start justify-start gap-5 px-10 py-5">
              {refund.items?.map((product) => <ProductInOrderCard product={product} key={product.id} />)}
            </div>
          </div>
        ))}
    </div>
  )
}
