import React, { FC, useEffect, useState } from 'react'
import { ProductDetailCarouselIMages } from '@/feautures/product/product-detail'
import { Edit2 } from 'react-feather'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { PATH_LK_SELLER } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import { VariantProduct } from '../../createProduct'

const images = ['/child.png', '/dog.jpg', '/dog2.jpg', '/fish.jpeg']

const gender = [
  {
    title: 'Мужской',
    value: 'MALE',
  },
  {
    title: 'Женский',
    value: 'FEMALE',
  },
]

const getGenderTitle = (value: string) => {
  return gender.find((item) => item.value === value)?.title
}

const mockDataVariants = [
  {
    id: Date.now(),
    images: [
      {
        id: Date.now(),
        main_image: true,
        image: '/dog.jpg',
      },
      {
        id: Date.now(),
        main_image: false,
        image: '/dog2.jpg',
      },
    ],
    title: 'red',
    size_variants: [
      {
        id: Date.now() + 1,
        size: 'XL',
      },
      {
        id: Date.now() + 2,
        size: 'L',
      },
    ],
    residue: 543,
    price: '35 990',
    description: 'Прекрасное описание товара для варианта 1',
  },
  {
    id: Date.now() + 3,
    images: [
      {
        id: Date.now() + 4,
        main_image: true,
        image: '/child.png',
      },
      {
        id: Date.now() + 5,
        main_image: false,
        image: '/dog.jpg',
      },
    ],
    title: 'blue',
    size_variants: [
      {
        id: Date.now() + 6,
        size: 'M',
      },
      {
        id: Date.now() + 7,
        size: 'S',
      },
    ],
    residue: 320,
    price: '29 990',
    description: 'Замечательное описание товара для варианта 2',
  },
  {
    id: Date.now() + 8,
    images: [
      {
        id: Date.now() + 9,
        main_image: false,
        image: '/child.png',
      },
      {
        id: Date.now() + 10,
        main_image: true,
        image: '/fish.jpeg',
      },
    ],
    title: 'green',
    size_variants: [
      {
        id: Date.now() + 11,
        size: 'XXL',
      },
      {
        id: Date.now() + 12,
        size: 'XS',
      },
    ],
    residue: 120,
    price: '42 990',
    description: 'Отличное описание товара для варианта 3',
  },
]

interface ProductDetailPageProps {
  product: any
}

export const ProductDetailPage: FC<ProductDetailPageProps> = ({ product }) => {
  console.log(product)
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<any>(null)

  const handleSelectVariant = (variant: any) => setSelectedVariant(variant)

  const navigateToEditProduct = (slug: string) =>
    router.push({
      pathname: `${PATH_LK_SELLER.productsList}/product-edit/${slug}`,
    })

  useEffect(() => {
    setSelectedVariant(product?.variants[0])
  }, [product])

  if (!product?.id) return null

  return (
    <>
      <p className="text-[23.04px] font-semibold text-[#000]">Детальный просмотр товара</p>

      <div className="grid grid-cols-1 gap-10">
        <div className="mt-10 flex items-start justify-between">
          <div className="flex items-start gap-[70px]">
            <ProductDetailCarouselIMages images={selectedVariant?.images} uniqueCarouselId="product-detail" />

            <div>
              <p className="text-[32px] font-medium text-[#000]">{selectedVariant?.title}</p>
              <p className="text-[16px] font-normal text-[#676767]">{selectedVariant?.description} </p>

              <div className="mt-4 grid grid-cols-1 gap-4">
                {!!product?.publish_date && (
                  <div>
                    <p className="text-[32px] font-medium text-[#000]">Дата публикации</p>
                    <p className="text-[12px] font-semibold text-[#676767]">{product.publish_date}</p>
                  </div>
                )}

                <div>
                  <p className="text-[32px] font-medium text-[#000]">Количество в наличии</p>
                  <p className="text-[12px] font-semibold text-[#676767]">200 шт.</p>
                </div>

                <div>
                  <p className="text-[32px] font-medium text-[#000]">Цена</p>
                  <p className="text-[12px] font-semibold text-[#676767]">23990 сом</p>
                </div>

                {!!product?.sku && (
                  <div>
                    <p className="text-[32px] font-medium text-[#000]">Артикул товара</p>
                    <p className="text-[12px] font-semibold text-[#676767]">{product.sku}</p>
                  </div>
                )}

                <div>
                  <p className="text-[32px] font-medium text-[#000]">Статус</p>
                  <p className="text-[12px] font-semibold text-[#676767]">{product?.status}</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant={BUTTON_STYLES.withoutBackground}
            size="small"
            className={'max-w-[153px]'}
            onClick={() => navigateToEditProduct(product.slug)}
          >
            <div className="flex items-center gap-[10px]">
              Редактировать
              <Edit2 size={24} />
            </div>
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-medium text-[#000]">Основная информация</p>

          <div className="grid max-w-[519px] grid-cols-[1fr_1fr_1fr] gap-6">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Пол</p>
              <p className="text-[16px] font-semibold text-[#171717]">{getGenderTitle(product?.gender)}</p>
            </div>

            {!!product?.country && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-semibold text-[#676767]">Страна производителя</p>
                <p className="text-[16px] font-semibold text-[#171717]">{product.country}</p>
              </div>
            )}

            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Категория</p>
              <p className="text-[16px] font-semibold text-[#171717]">{product?.category?.title}</p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Подкатегория</p>
              <p className="text-[16px] font-semibold text-[#171717]">{product?.category?.title}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-medium text-[#000]">Дополнительная информация</p>

          <div className="grid grid-cols-[1fr_1fr] gap-6">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Состав товара</p>
              <p className="text-[16px] font-semibold text-[#171717]">
                Наружный Материал: Шерсть 65%, Шелк 35% Подкладка: Шелк 100%
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Описание</p>
              <p className="text-[16px] font-semibold text-[#171717]">
                Черный/белый, шелк, сатиновый финиш, узор в диагональную полоску, завышенная талия, потайная застежка на
                молнии сбоку, прямой подол и длина миди.
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-semibold text-[#676767]">Рекомендации по уходу</p>
              <p className="text-[16px] font-semibold text-[#171717]">Информацию можно найти на этикетке товара</p>
            </div>
          </div>
        </div>

        {!!product?.variants?.length && (
          <div className="flex flex-col gap-5">
            <p className="text-[18px] font-medium text-[#000]">Варианты товара</p>

            <div className="relative flex max-w-[528px] items-start gap-6 overflow-x-auto">
              {product.variants.map((variant: any) => (
                <VariantProduct key={variant.slug} data={variant} selectVariant={handleSelectVariant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
