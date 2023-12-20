import { OrderItem } from '@/shared/api/gen'
import { PATH_LK_SELLER } from '@/shared/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface TypeProductInOrderCardProps {
  product: OrderItem
}

export const ProductInOrderCard: FC<TypeProductInOrderCardProps> = ({ product }) => {
  const router = useRouter()

  const navigateToPath = () => {
    router.push(`${PATH_LK_SELLER.productsList}/product-detail/${product.product_slug}`)
  }

  return (
    <div className="flex w-full max-w-[913px] items-start justify-start gap-7" key={product.id}>
      <Image
        src={
          product?.product_variant?.image_main ||
          product?.product_variant?.images?.[0]?.image ||
          '/images/mock/child.png'
        }
        width={80}
        height={80}
        alt="child"
        onClick={() => navigateToPath()}
        className="cursor-pointer"
      />

      <div className="flex flex-grow flex-wrap items-start justify-start gap-6">
        <div>
          <p className="cursor-pointer text-xl font-medium text-neutral-900" onClick={() => navigateToPath()}>
            {product.product_title}
          </p>
          <p className="text-base font-normal text-stone-500">{product.product_description}</p>
        </div>

        <div className="flex flex-wrap items-start justify-start gap-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-stone-500">Размер:</span>
            <span className="text-base font-normal text-neutral-900">{product.size}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-stone-500">Цвет:</span>
            <span className="text-base font-normal text-neutral-900">{product.product_variant.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-stone-500">Кол-во:</span>
            <span className="w-5 text-center text-base font-normal text-neutral-900">{product.quantity}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-900 line-through">{Math.floor(+product.price)} сом</span>
            <span className="text-base font-medium text-error700">{Math.floor(+product.price)} сом</span>
          </div>
        </div>
      </div>
    </div>
  )
}
