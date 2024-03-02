import React, { FC, useState } from 'react'
import { ProductDetailCarouselIMages } from '@/feautures/product/product-detail'
import { CheckCircle, ChevronDown, ChevronRight, Edit2, Plus } from 'react-feather'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { PATH_LK_SELLER } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import { CreateVariantModal, VariantProduct } from '../../createProduct'
import { ProductVariantDetailModal } from '../modal'
import { TypeProductFromBack, TypeSpecification, TypeVariant } from '@/shared/lib/types/sellerTypes'
import ProductDetailReview from '../reviews/ui'
import { CustomPopup, HorizontalCarousel, Statuses } from '@/shared/ui'
import { statuses } from '@/shared/lib/consts/globals'
import { $apiProductsApi } from '@/shared/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'
import { ProductUpdateStatusEnum } from '@/shared/api/gen'
import { SwiperSlide } from 'swiper/react'
import { findCategoryAndParents } from '@/shared/lib/helpers'

type ProductStatusKey = keyof typeof statuses.product

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

const sellerClient = new SellerClient()

export const ProductDetailPage: FC<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter()
  const [showVariantDetail, setShowVariantDetail] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [activePopup, setActivePopup] = useState('')
  const productStatuses = Object.values(statuses['product'])
  const queryClient = useQueryClient()
  const [addVariantModal, setAddVariantModal] = useState(false)
  const { data: categories } = useQuery(['categories'], sellerClient.fetchCategories)
  const mainVariant = product?.variants.find((variant) => variant.is_main)
  const breadcrumb = findCategoryAndParents(categories, product?.category?.slug)

  const handleShowCreateVariantModal = () => setAddVariantModal((prev) => !prev)

  const { data: reviews } = useQuery(['reviews', product?.slug], () => sellerClient.fetchReviews(product?.slug), {
    enabled: !!product?.slug,
  })

  const handleActivePopup = (title: string) => setActivePopup(title)

  const handleClosePopup = () => setActivePopup('')

  const handleSelectVariant = (slug: string) => setSelectedVariant(slug)

  const handleShowVariantDetail = () => setShowVariantDetail((prev) => !prev)

  const navigateToEditProduct = (slug: string) =>
    router.push({
      pathname: `${PATH_LK_SELLER.productsList}/product-edit/${slug}`,
    })

  const changeMainVariant = async (slug: string, is_main: boolean) => {
    await $apiProductsApi.productsSellerProductVariantsPartialUpdate(slug, { is_main })
    await queryClient.invalidateQueries(['product'])
  }

  const handleChangeStatus = async (status: ProductStatusKey) => {
    await sellerClient.editProduct(product?.slug, { status: status as ProductUpdateStatusEnum })
    await queryClient.invalidateQueries(['product'])
    handleClosePopup()
  }

  const addVariantValues = async (value: TypeVariant) => {
    const body = {
      ...value,
      product: product?.id,
    }

    const responseVariant = await sellerClient.createVariant(body)

    await Promise.all(
      // eslint-disable-next-line
      //@ts-ignore
      body.images.map(async ({ image, is_main }: TypeImage) => {
        await sellerClient.uploadProductVariantImage(responseVariant?.id, image, is_main)
      }),
    )

    await queryClient.invalidateQueries(['product'])
  }

  if (!product?.id) return null

  return (
    <>
      <p className="text-[23.04px] font-semibold text-[#000]">Детальный просмотр товара</p>

      <div className="grid grid-cols-1 gap-10">
        <div className="mt-10 flex items-start justify-between gap-4">
          <div className="flex items-start gap-[70px]">
            <ProductDetailCarouselIMages
              images={mainVariant?.images || product?.variants[0]?.images}
              uniqueCarouselId="product-detail"
            />

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

                  <div onClick={() => handleActivePopup('quantity')} className="flex cursor-pointer items-center gap-1">
                    <p className="text-[16px] font-semibold text-[#171717]">{product.quantity} шт.</p>

                    <ChevronDown />
                  </div>

                  <CustomPopup isVisible={activePopup === 'quantity'} onClose={() => handleClosePopup()}>
                    <div className="flex flex-col gap-2">
                      {product?.variants?.map((variant) => (
                        <div className="flex cursor-pointer items-center justify-between gap-10" key={variant.slug}>
                          <p className="text-base font-normal text-neutral-900">{variant.title}</p>
                          <p className="text-base font-normal text-neutral-900">{variant.sum_size_quantities} шт.</p>
                        </div>
                      ))}
                    </div>
                  </CustomPopup>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#676767]">Цена</p>
                  <p className="text-[16px] font-semibold text-[#171717]">{Math.floor(+product.price_from)} сом</p>
                </div>

                {!!product?.sku && (
                  <div>
                    <p className="text-[12px] font-semibold text-[#676767]">Артикул товара</p>
                    <p className="text-[16px] font-semibold text-[#171717]">{product.sku}</p>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-[12px] font-semibold text-[#676767]">Статус</p>

                  <div onClick={() => handleActivePopup('status')} className="flex cursor-pointer items-center gap-1">
                    <Statuses type="product" status={product?.status} />

                    <ChevronDown />
                  </div>

                  <CustomPopup isVisible={activePopup === 'status'} onClose={() => handleClosePopup()}>
                    <div className="flex flex-col gap-2">
                      {productStatuses.map(({ value }, index) => (
                        <div className="cursor-pointer" key={index} onClick={() => handleChangeStatus(value)}>
                          <Statuses type="product" status={value} />
                        </div>
                      ))}
                    </div>
                  </CustomPopup>
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

          <div className="grid  grid-cols-[1fr_1fr_1fr] gap-6">
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
              <p className="flex w-max text-[16px] font-semibold text-[#171717]">
                {breadcrumb.map((catTitle, index) => (
                  <span key={index} className="mr-1 flex w-full items-center gap-1 text-base">
                    {index > 0 && <ChevronRight size={16} />}
                    {catTitle}
                  </span>
                ))}
              </p>
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
                    <span className="text-[16px] font-semibold text-[#171717]" key={index}>
                      {`${specification.title}: ${specification.value}`}
                      {index < product.specifications.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(!!mainVariant?.description || !!product?.variants[0]?.description) && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-semibold text-[#676767]">Описание</p>
                <p className="text-[16px] font-semibold text-[#171717]">
                  {mainVariant?.description || product?.variants[0]?.description}
                </p>
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
            <div className="flex items-center justify-between gap-3">
              <p className="text-[18px] font-medium text-[#000]">Варианты товара</p>

              <Button
                variant={BUTTON_STYLES.withoutBackground}
                className="max-w-max !py-1 px-2"
                onClick={handleShowCreateVariantModal}
              >
                <div className="flex items-center gap-1">
                  <p>Добавить вариант</p>
                  <Plus />
                </div>
              </Button>
            </div>

            <div className="relative flex items-start gap-6 overflow-x-auto">
              <HorizontalCarousel uniqueCarouselId={'product-detail-variants'}>
                {product.variants.map((variant: TypeVariant) => (
                  <SwiperSlide key={variant.slug} className="!w-[150px]">
                    <div className="group/edit relative overflow-hidden">
                      <VariantProduct key={variant.slug} data={variant} />

                      <Button
                        onClick={() => {
                          if (variant?.slug) {
                            handleSelectVariant(variant.slug)
                            handleShowVariantDetail()
                          }
                        }}
                        variant={BUTTON_STYLES.primaryCtaIndigo}
                        className="invisible absolute left-2 top-2 z-[1] h-[25px] max-w-[65px] px-1 py-2 !text-[12px] !font-normal group-hover/edit:visible"
                      >
                        Посмотреть
                      </Button>

                      <Button
                        onClick={() => variant.slug && changeMainVariant(variant.slug, !variant.is_main)}
                        variant={BUTTON_STYLES[variant.is_main ? 'primaryCta' : 'withoutBackground']}
                        className="mt-4 !p-1"
                      >
                        <div className="flex items-center gap-2">
                          {variant.is_main && <CheckCircle size={16} />}
                          {variant.is_main ? 'Основной' : 'Сделать основным'}
                        </div>
                      </Button>
                    </div>
                  </SwiperSlide>
                ))}
              </HorizontalCarousel>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center justify-start gap-2">
            <p className="text-lg font-medium text-neutral-900">Отзывы</p>
            <p className="shrink grow basis-0 text-lg font-medium text-stone-500">{reviews?.length || 0}</p>
          </div>

          {!!reviews?.length && reviews.map((review) => <ProductDetailReview review={review} key={review.id} />)}
        </div>
      </div>

      {showVariantDetail && (
        <ProductVariantDetailModal
          // eslint-disable-next-line
          //@ts-ignore
          slug_variant={selectedVariant}
          open={showVariantDetail}
          handleClose={handleShowVariantDetail}
        />
      )}

      {addVariantModal && (
        <CreateVariantModal
          open={addVariantModal}
          handleClose={handleShowCreateVariantModal}
          addVariant={addVariantValues}
          removeVariant={handleShowCreateVariantModal}
        />
      )}
    </>
  )
}
