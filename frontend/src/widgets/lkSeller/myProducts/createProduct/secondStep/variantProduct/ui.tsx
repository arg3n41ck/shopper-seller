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
}

const sellerClient = new SellerClient()

const VariantProduct: FC<VariantProps> = ({ data }: VariantProps) => {
	const dispatch = useAppDispatch()
	const [hovering, setHovering] = useState<boolean>(false)
	const [showDeleteBackdrop, setShowDeleteBackdrop] = useState<boolean>(false)

	const handleMouseEnter = useCallback(() => setHovering(true), [])
	const handleMouseLeave = useCallback(() => setHovering(false), [])

	const handleShowBackdrop = (): void =>
		setShowDeleteBackdrop((prev: boolean) => !prev)

	const deleteVariantById = async (): Promise<void> => {
		await sellerClient.deleteSellerProductPreview(data.id)
		dispatch(fetchProduct(data.product_id))
	}

	// const residue = useMemo(() => {

	// }, [data.size])

	return (
		<>
			<PreviewVariant
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Carousel
					slides={data.product_images}
					hovering={hovering}
					handleShowBackdrop={handleShowBackdrop}
				/>
				<PreviewVariantsInfo>
					<TitleText>{data.color}</TitleText>
					<DescriptionText>{data.description}</DescriptionText>
					<SizesContainer>
						{!!data.size?.length &&
							data.size.map((item: any) => (
								<Size key={item.id}>{item.size}</Size>
							))}
					</SizesContainer>
					<ResidueText>700 шт.</ResidueText>
					<PriceText>{data.price} сом</PriceText>
				</PreviewVariantsInfo>
			</PreviewVariant>

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
