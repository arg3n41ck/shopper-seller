import React, { FC, useState } from 'react'
import { ProductDetailCarouselIMages } from '@/feautures/product/product-detail'
import { Edit2 } from 'react-feather'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { PATH_LK_SELLER } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import { VariantProduct } from '../../createProduct'
import { ProductVariantDetailModal } from '../modal'
import { TypeProductFromBack, TypeSpecification, TypeVariant } from '@/shared/lib/types/sellerTypes'

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

interface ProductDetailPageProps {
  product: TypeProductFromBack
}

export const ProductDetailPage: FC<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter()
  const [showVariantDetail, setShowVariantDetail] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<TypeVariant | null>(null)

  const handleSelectVariant = (variant: TypeVariant) => {
    setSelectedVariant(variant)
  }

  const handleShowVariantDetail = () => {
    setShowVariantDetail((prev) => !prev)
  }

  const navigateToEditProduct = (slug: string) =>
    router.push({
      pathname: `${PATH_LK_SELLER.productsList}/product-edit/${slug}`,
    })

  if (!product?.id) return null

  return (
    <>
      <p className="text-[23.04px] font-semibold text-[#000]">Детальный просмотр товара</p>

      <div className="grid grid-cols-1 gap-10">
        <div className="mt-10 flex items-start justify-between">
          <div className="flex items-start gap-[70px]">
            <ProductDetailCarouselIMages images={product?.variants[0]?.images} uniqueCarouselId="product-detail" />

            <div>
              <p className="text-[32px] font-medium text-[#000]">{product?.title}</p>
              <p className="text-[16px] font-normal text-[#676767]">{product?.description} </p>

              <div className="mt-4 grid grid-cols-1 gap-4">
                {!!product?.publish_date && (
                  <div>
                    <p className="text-[12px] font-semibold text-[#676767]">Дата публикации</p>
                    <p className="text-[16px] font-semibold text-[#171717]">{product.publish_date}</p>
                  </div>
                )}

                <div>
                  <p className="text-[12px] font-semibold text-[#676767]">Количество в наличии</p>
                  <p className="text-[16px] font-semibold text-[#171717]">200 шт.</p>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#676767]">Цена</p>
                  <p className="text-[16px] font-semibold text-[#171717]">23990 сом</p>
                </div>

                {!!product?.sku && (
                  <div>
                    <p className="text-[12px] font-semibold text-[#676767]">Артикул товара</p>
                    <p className="text-[16px] font-semibold text-[#171717]">{product.sku}</p>
                  </div>
                )}

                <div>
                  <p className="text-[12px] font-semibold text-[#676767]">Статус</p>
                  <p className="text-[16px] font-semibold text-[#171717]">{product?.status}</p>
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
            {!!product?.specifications?.length && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-semibold text-[#676767]">Состав товара</p>

                <div>
                  {product?.specifications.map((specification: TypeSpecification, index: number) => (
                    <span className="text-[16px] font-semibold text-[#171717]" key={specification.title}>
                      {`${specification.title}: ${specification.value}`}
                      {index < product.specifications.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!product?.variants[0]?.description && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-semibold text-[#676767]">Описание</p>
                <p className="text-[16px] font-semibold text-[#171717]">{product?.variants[0]?.description}</p>
              </div>
            )}

            {!!product?.recommendation && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-semibold text-[#676767]">Рекомендации по уходу</p>
                <p className="text-[16px] font-semibold text-[#171717]">{product?.recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {!!product?.variants?.length && (
          <div className="flex flex-col gap-5">
            <p className="text-[18px] font-medium text-[#000]">Варианты товара</p>

            <div className="relative flex max-w-[528px] items-start gap-6 overflow-x-auto">
              {product.variants.map((variant: TypeVariant) => (
                <div key={variant.slug} className="group/edit relative overflow-hidden">
                  <VariantProduct key={variant.slug} data={variant} />

                  <Button
                    onClick={() => {
                      handleSelectVariant(variant)
                      handleShowVariantDetail()
                    }}
                    variant={BUTTON_STYLES.primaryCtaIndigo}
                    className="invisible absolute left-2 top-2 z-[1] h-[25px] max-w-[65px] px-1 py-2 !text-[12px] !font-normal group-hover/edit:visible"
                  >
                    Посмотреть
                    {/* <Edit size={16} /> */}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showVariantDetail && (
        <ProductVariantDetailModal
          // eslint-disable-next-line
          //@ts-ignore
          variant={selectedVariant}
          open={showVariantDetail}
          handleClose={handleShowVariantDetail}
        />
      )}
    </>
  )
}
