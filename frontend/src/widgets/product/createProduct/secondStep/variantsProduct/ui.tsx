import React, { FC, useEffect, useState } from 'react'
import { steps } from '@/components/layouts/createProductLayout'
import { StepBlock } from '@/components/layouts/createProductLayout/styles'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/routes/paths'
import { fetchProduct } from '@/shared/store/slices/seller'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import { useRouter } from 'next/router'
import { ChevronRight, Plus } from 'react-feather'
import CreateProductPaginationSlot from '../../slots/createProductStepPagination/ui'
import CreateProductSubmitButtonSlot from '../../slots/createProductSubmitButtonSlot/ui'
import { CreateVariantModal } from '../modals/createVariantModal'
import { PreviewVariantsContainer, VariantsContainer } from '../styles'
import { VariantProduct } from '../variantProduct'

interface VariantsProductProps {
	data: any
	onChange: (value: any) => void
	removeVariant?: (data: any) => void
}

const VariantsProduct: FC<VariantsProductProps> = ({
	data,
	onChange,
	removeVariant,
}) => {
	const router = useRouter()
	const id = (router.query?.id as string) || ''
	const dispatch = useAppDispatch()
	const [createVariantModal, setCreateVariantModal] = useState(false)
	const { product } = useAppSelector(state => state.seller)

	const handleShowCreateVariantModal = () =>
		setCreateVariantModal(prev => !prev)

	const handleNavigate = () =>
		!!product?.preview?.length &&
		router.push({
			pathname: PATH_LK_SELLER_CREATE_PRODUCT.step3,
			query: { id },
		})

	useEffect(() => {
		id && dispatch(fetchProduct(id))
	}, [])

	return (
		<>
			<VariantsContainer>
				<PreviewVariantsContainer>
					{!!data?.length &&
						data.map((variant: any, index: number) => (
							<VariantProduct
								key={index}
								data={variant}
								removeVariant={removeVariant}
							/>
						))}
				</PreviewVariantsContainer>

				<Button
					onClick={handleShowCreateVariantModal}
					variant={BUTTON_STYLES.primaryCta}
					className={'max-w-[48px]'}
				>
					<Plus />
				</Button>
			</VariantsContainer>

			{createVariantModal && (
				<CreateVariantModal
					open={createVariantModal}
					handleClose={handleShowCreateVariantModal}
					onChange={onChange}
				/>
			)}
		</>
	)
}

export default VariantsProduct
