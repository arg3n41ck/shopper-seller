import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { FC, useState } from 'react'
import { Modal } from '@/shared/ui/modals'
import { Button } from '@/shared/ui/buttons'
import { Edit2, Trash2 } from 'react-feather'
import { CreateVariantModal, DeleteVariantBackdrop } from '../../createProduct'
import Image from 'next/image'
import { $apiProductsApi } from '@/shared/api'
import { TypeImageFile, TypeSizeQuantity, TypeVariant } from '@/shared/lib/types/sellerTypes'

interface ProductVariantDetailModalProps {
  variant: TypeVariant
  open: boolean
  handleClose: () => void
}

const deleteVariant = async (slug: string) => await $apiProductsApi.productsSellerProductVariantsDelete(slug)

const editVariant = async (variant: string, updatedVariant: TypeVariant) => {
  // eslint-disable-next-line
  const { images, ...restValuesVariant } = updatedVariant
  // eslint-disable-next-line
  //@ts-ignore
  const { data } = await $apiProductsApi.productsSellerProductVariantsPartialUpdate(variant, restValuesVariant)
  return data
}

export const ProductVariantDetailModal: FC<ProductVariantDetailModalProps> = ({ variant, open, handleClose }) => {
  const [isDeleteBackdrop, setIsDeleteBackdrop] = useState<boolean>(false)
  const [isEditVariantModal, setIsEditVariantModal] = useState(false)

  const handleShowEditVariantModal = () => setIsEditVariantModal((prev) => !prev)

  const handleShowDeleteBackDrop = () => setIsDeleteBackdrop((prev) => !prev)

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
            {variant.images.map((image: TypeImageFile) => (
              <div className="relative" key={image.id}>
                <Image
                  className={`rounded-5 relative h-[187px] w-[150px] cursor-pointer border-[2px] border-transparent object-cover ${
                    // eslint-disable-next-line
                    true ? '!border-primaryDash600' : ''
                  } group-hover/buttons:border-primaryDash600`}
                  src={image.image}
                  width={150}
                  height={187}
                  alt={`image ${image.id}`}
                />

                {true && (
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

                      <p className=" text-base font-normal text-neutral-900">{size?.price} сом</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 border border-stone-500 px-[15px] py-[11px]">
                    <div className="flex items-center justify-start gap-2">
                      <div className="flex items-center justify-start gap-1">
                        <div className=" text-base font-normal text-neutral-900">от</div>

                        <p className=" text-sm font-normal text-neutral-900 line-through">{size?.price} сом</p>
                      </div>
                      <p className="text-base font-normal text-error700">{size?.price} сом</p>
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
          defaultValues={variant}
        />
      )}
    </>
  )
}
