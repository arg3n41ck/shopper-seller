import React, { FC, useCallback, useState } from 'react'
import Carousel from '@/shared/ui/carousels/createProductCarousel'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { fetchProduct } from '@/entities/seller/model/slice'
import DeleteVariantBackdrop from '../modals/deleteVariantBackboard/ui'

interface VariantProps {
  data: any
}

const sellerClient = new SellerClient()

const VariantProduct: FC<VariantProps> = ({ data }: VariantProps) => {
  const dispatch = useAppDispatch()
  const [hovering, setHovering] = useState<boolean>(false)
  const [showDeleteBackdrop, setShowDeleteBackdrop] = useState<boolean>(false)

  const handleMouseEnter = useCallback(() => setHovering(true), [])
  const handleMouseLeave = useCallback(() => setHovering(false), [])

  const handleShowBackdrop = (): void => setShowDeleteBackdrop((prev: boolean) => !prev)

  const deleteVariantById = async (): Promise<void> => {
    await sellerClient.deleteSellerProductPreview(data.id)
    dispatch(fetchProduct(data.product_id))
  }

  // const residue = useMemo(() => {

  // }, [data.size])

  return (
    <>
      <div
        className="flex h-full w-full max-w-[160px] cursor-pointer flex-col gap-[24px] hover:border-primaryDash600"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel slides={data.product_images} hovering={hovering} handleShowBackdrop={handleShowBackdrop} />
        <div className="flex flex-col gap-[12px]">
          <p className="text-[18px] font-[600] text-neutral-900">{data.color}</p>
          <p className="text-[14px] text-neutral-800">{data.description}</p>
          <div className="flex flex-wrap items-center gap-[8px]">
            {!!data.size?.length &&
              data.size.map((item: any) => (
                <div className="text-[12px] text-gray" key={item.id}>
                  {item.size}
                </div>
              ))}
          </div>
          <p className="text-[16px] font-[600] text-neutral-900">700 шт.</p>
          <p className="text-[19.2px] font-[600] leading-[33px] text-neutral-900">{data.price} сом</p>
        </div>
      </div>

      {showDeleteBackdrop && (
        <DeleteVariantBackdrop
          open={showDeleteBackdrop}
          onClose={handleShowBackdrop}
          deleteVariant={deleteVariantById}
        />
      )}
    </>
  )
}

export default VariantProduct
