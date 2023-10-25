import React, { FC, useCallback, useState } from 'react'
import Carousel from '@/components/carousels/createProductCarousel'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { fetchProduct } from '@/shared/store/slices/seller'
import DeleteVariantBackdrop from '../modals/deleteVariantBackboard/ui'
import {
  DescriptionText,
  PreviewVariant,
  PreviewVariantsInfo,
  PriceText,
  ResidueText,
  Size,
  SizesContainer,
  TitleText,
} from '../styles'

interface VariantProps {
  data: any
  removeVariant?: (data: any) => void
  selectVariant?: (variant: any) => void
}

const sellerClient = new SellerClient()

const VariantProduct: FC<VariantProps> = ({ data, removeVariant, selectVariant }: VariantProps) => {
  const dispatch = useAppDispatch()
  const [hovering, setHovering] = useState<boolean>(false)
  const [showDeleteBackdrop, setShowDeleteBackdrop] = useState<boolean>(false)

  const handleMouseEnter = useCallback(() => setHovering(true), [])
  const handleMouseLeave = useCallback(() => setHovering(false), [])

  const handleShowBackdrop = (): void => setShowDeleteBackdrop((prev: boolean) => !prev)

  const deleteVariantByIndex = async () => {
    !!removeVariant && removeVariant(data)
    handleShowBackdrop()
  }

  // const deleteVariantById = async (): Promise<void> => {
  // 	await sellerClient.deleteSellerProductPreview(data.id)
  // 	dispatch(fetchProduct(data.product_id))
  // }

  // Конвертация изображений в URL, если они являются файлами
  const convertedImages = data.images.map((item: any) => {
    if (typeof window !== 'undefined' && (item.image instanceof File || item.image instanceof Blob)) {
      return {
        ...item,
        image: URL.createObjectURL(item.image),
      }
    }
    return item
  })

  if (!data?.title) return null

  return (
    <>
      <PreviewVariant
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => selectVariant && selectVariant(data)}
      >
        <Carousel slides={convertedImages} hovering={hovering} handleShowBackdrop={handleShowBackdrop} />
        <PreviewVariantsInfo>
          <TitleText>{data.title}</TitleText>
          <DescriptionText>{data.description}</DescriptionText>
          <SizesContainer>
            {!!data.size_variants?.length &&
              data.size_variants.map((item: any, index: number) => <Size key={index}>{item.size}</Size>)}
          </SizesContainer>
          {/* <ResidueText>700 шт.</ResidueText> */}
          <PriceText>{data.price} сом</PriceText>
        </PreviewVariantsInfo>
      </PreviewVariant>

      {showDeleteBackdrop && (
        <DeleteVariantBackdrop
          open={showDeleteBackdrop}
          onClose={handleShowBackdrop}
          deleteVariant={deleteVariantByIndex}
        />
      )}
    </>
  )
}

export default VariantProduct
