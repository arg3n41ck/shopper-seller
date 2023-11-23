import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { FC, useState } from 'react'
import { Modal } from '@/shared/ui/modals'
import { Button } from '@/shared/ui/buttons'
import { Edit2, Trash2 } from 'react-feather'
import { CreateVariantModal, DeleteVariantBackdrop } from '../../createProduct'
import Image from 'next/image'
import { $apiProductsApi } from '@/shared/api'
import { TypeImage, TypeSizeQuantity, TypeVariant } from '@/shared/lib/types/sellerTypes'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'

interface ProductVariantDetailModalProps {
  slug_variant: string
  open: boolean
  handleClose: () => void
}

const sellerClient = new SellerClient()

const deleteVariant = async (slug: string) => await $apiProductsApi.productsSellerProductVariantsDelete(slug)

export const ProductVariantDetailModal: FC<ProductVariantDetailModalProps> = ({ slug_variant, open, handleClose }) => {
  const queryClient = useQueryClient()
  const [isDeleteBackdrop, setIsDeleteBackdrop] = useState<boolean>(false)
  const [isEditVariantModal, setIsEditVariantModal] = useState(false)
  const { data: variant } = useQuery(['variant', slug_variant], () => sellerClient.fetchVariant(slug_variant))

  const editVariant = async (variant: string, updatedVariant: TypeVariant) => {
    // eslint-disable-next-line
    const { images, image_main, price_max, price_min, ...restValuesVariant } = updatedVariant
    // eslint-disable-next-line
    //@ts-ignore
    const { data } = await $apiProductsApi.productsSellerProductVariantsPartialUpdate(variant, restValuesVariant)

    // eslint-disable-next-line
    // @ts-ignore
    const fileImages = images.filter((item) => item.image instanceof File)

    await Promise.all(
      // eslint-disable-next-line
      // @ts-ignore
      fileImages.map(async ({ image, is_main }: TypeImage) => {
        await sellerClient.uploadProductVariantImage(data?.id, image, is_main)
      }),
    )

    await queryClient.invalidateQueries(['product'])
    await queryClient.invalidateQueries(['variant'])

    return data
  }

  const deleteVariantImage = async (id: number) => {
    await $apiProductsApi.productsSellerVariantImagesDelete(id)
    await queryClient.invalidateQueries(['product'])
  }

  const toggleVariantMainImage = async (id: number, is_main: boolean) => {
    await sellerClient.updateVariantMainImage(id, is_main)
    // await queryClient.invalidateQueries(['product'])
  }

  const handleShowEditVariantModal = () => setIsEditVariantModal((prev) => !prev)

  const handleShowDeleteBackDrop = () => setIsDeleteBackdrop((prev) => !prev)

  if (!variant) return null

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          maxWidth: '801px',
          maxHeight: '95%',
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        <div className={'px-10 py-5'}>
          <p className="text-2xl font-semibold text-[#000]">Настройки варианта</p>

          <div className="mt-10 flex items-center justify-between">
            <p className="text-2xl font-medium text-neutral-900">{variant.title}</p>

            <Button
              variant={BUTTON_STYLES.withoutBackground}
              size="small"
              className={'max-w-[153px]'}
              onClick={handleShowEditVariantModal}
            >
              <div className="flex items-center gap-[10px]">
                Редактировать
                <Edit2 size={24} />
              </div>
            </Button>
          </div>

          <p className="mb-3 mt-[30px] text-[18px] font-semibold text-neutral-900">Фотографии</p>

          <div className="flex max-w-full items-center gap-5 overflow-x-scroll">
            {variant.images?.map((image) => (
              <div className="relative" key={image.id}>
                <Image
                  className={`rounded-5 relative h-[187px] w-[150px] cursor-pointer border-[2px] border-transparent object-cover ${
                    // eslint-disable-next-line
                    image.image === variant.image_main ? '!border-primaryDash600' : ''
                  } group-hover/buttons:border-primaryDash600`}
                  src={image.image || ''}
                  width={150}
                  height={187}
                  alt={`image ${image.id}`}
                />

                {image.image === variant.image_main && (
                  <Button
                    variant={BUTTON_STYLES.primaryCtaIndigo}
                    className="absolute left-2 top-2 z-[1] h-[25px] max-w-[84px] px-1 py-2 !text-[12px] !font-normal"
                  >
                    Основное фото
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div>
            <p className="mb-5 mt-8 text-[18px] font-semibold text-neutral-900">Размеры и количество</p>

            <div className="grid">
              {variant.size_variants.map((size: TypeSizeQuantity) => (
                <div className="grid grid-cols-[60px_170px_212px]" key={size.size}>
                  <div className="flex items-center justify-center gap-2 border border-stone-500 bg-zinc-300 px-[15px] py-[11px]">
                    <p className=" text-base font-medium text-neutral-900">{size.size}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 border border-stone-500 px-[15px] py-[11px]">
                    <div className="flex items-start justify-start gap-1">
                      <p className=" text-base font-normal text-neutral-900">от</p>

                      <p className=" text-base font-normal text-neutral-900">{variant.price_min} сом</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 border border-stone-500 px-[15px] py-[11px]">
                    <div className="flex items-center justify-start gap-2">
                      <div className="flex items-center justify-start gap-1">
                        <div className=" text-base font-normal text-neutral-900">от</div>

                        <p className=" text-sm font-normal text-neutral-900 line-through">{variant.price_max} сом</p>
                      </div>
                      <p className="text-base font-normal text-error700">{variant.price_min} сом</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!!variant?.description && (
            <div>
              <p className="mb-5 mt-8 text-[18px] font-semibold text-neutral-900">Дополнительная информация</p>

              <p className="max-w-[474px] text-base font-normal text-neutral-900">{variant?.description}</p>
            </div>
          )}

          <Button
            onClick={handleShowDeleteBackDrop}
            variant={BUTTON_STYLES.error}
            type="submit"
            className="mt-[130px] max-w-[258px]"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={20} />
              Удалить вариант
            </div>
          </Button>
        </div>
      </Modal>

      <DeleteVariantBackdrop
        open={isDeleteBackdrop}
        onClose={handleShowDeleteBackDrop}
        // eslint-disable-next-line
        //@ts-ignore
        deleteVariant={() => deleteVariant(variant.slug)}
      />

      {isEditVariantModal && (
        <CreateVariantModal
          open={isEditVariantModal}
          handleClose={handleShowEditVariantModal}
          // eslint-disable-next-line
          //@ts-ignore
          editVariant={editVariant}
          // eslint-disable-next-line
          //@ts-ignore
          removeVariant={(value) => deleteVariant(value)}
          // eslint-disable-next-line
          //@ts-ignore
          defaultValues={variant}
          deleteImage={deleteVariantImage}
          toggleVariantMainImage={toggleVariantMainImage}
        />
      )}
    </>
  )
}
