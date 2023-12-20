import { Order } from '@/shared/api/gen'
import { Statuses } from '@/shared/ui'
import { format, parseISO } from 'date-fns'
import React from 'react'

interface TypeOrderCardProps {
  children: React.ReactNode
  order: Order
}

export const OrderCard: React.FC<TypeOrderCardProps> = ({ children, order }) => {
  return (
    <div className="flex w-full max-w-[973px] flex-col items-start justify-start border border-zinc-300">
      <div className="flex flex-col items-start justify-start self-stretch border-b border-zinc-300 bg-white px-5 py-3">
        <div className="flex items-center justify-start gap-3 self-stretch">
          <p className="text-lg font-medium uppercase text-neutral-900">Номер заказа #{order.order_id}</p>

          <Statuses type="order" status={order.status} />
        </div>

        <p className="text-base font-normal text-stone-500">
          Дата заказа: {format(parseISO(order.created_at || ''), 'dd.MM.yyyy HH:mm:ss')}
        </p>
      </div>

      <div className="flex flex-col items-start justify-start gap-5 self-stretch border-b border-zinc-300 bg-white p-5">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <div>
            <p className="text-lg font-medium uppercase text-neutral-900">Покупатель</p>

            <p className="text-base font-normal text-neutral-900">{order.full_name || ''}</p>
            <p className="text-base font-normal text-neutral-900">{order.phone_number || ''}</p>
            <p className="text-base font-normal text-neutral-900">{order.email || ''}</p>
          </div>
        </div>
      </div>

      <div className="w-full">{children}</div>

      <div className="grid grid-cols-2 gap-5 self-stretch border-t border-zinc-300 bg-white p-5">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <p className="text-lg font-medium uppercase text-neutral-900">Способ доставки</p>

          <div className="flex items-center justify-start gap-3 self-stretch">
            <p className="text-base font-medium text-neutral-900">До двери</p>

            <p className="text-base font-normal text-stone-500">1-3 дня</p>

            <p className="w-[68px] text-right text-base font-normal text-neutral-900">300 сом</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-lg font-medium uppercase text-neutral-900">Адрес доставки</p>

          <div>
            <p className="text-base font-normal capitalize text-neutral-900">{order.address}</p>
            <p className="text-base font-normal capitalize text-neutral-900">{order.zip_code}</p>
            <p className="text-base font-normal capitalize text-neutral-900">{order.phone_number}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-5 self-stretch border-t border-zinc-300 bg-white p-5">
        <div className="flex flex-col items-center justify-start gap-2 self-stretch">
          <div className="flex items-center justify-start gap-1 self-stretch">
            <p className="text-base font-normal text-neutral-900">Промежуточный итог</p>

            <p className="flex-grow text-right text-base font-normal text-neutral-900">
              {order.total ? +order.total - 1200 : 0} сом
            </p>
          </div>

          <div className="flex items-center justify-start gap-1 self-stretch">
            <p className="text-base font-normal text-neutral-900">Доставка</p>
            <p className="flex-grow text-right text-base font-normal text-neutral-900">1 200 сом</p>
          </div>

          <div className="flex items-center justify-start gap-1 self-stretch">
            <p className="text-xl font-medium text-neutral-900">Итого</p>

            <p className="flex-grow text-right text-xl font-medium text-neutral-900">{order.total} сом</p>
          </div>
        </div>
      </div>
    </div>
  )
}
