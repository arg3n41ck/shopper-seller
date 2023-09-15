import React, { FC } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import Button from '@/shared/ui/button'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'react-feather'
import {
	FooterButtonsContainer,
	FooterContainer,
	FooterInnerContainer,
	FooterLine,
} from './styles'

interface PreviewProductFooterProps {
	handlePublishProduct: (type: string) => void
}

const FooterPreviewProduct: FC<PreviewProductFooterProps> = ({
	handlePublishProduct,
}) => {
	const router = useRouter()
	const handleNavigateToPrevPage = () => router.back()

	return (
		<FooterContainer>
			<FooterLine />
			<FooterInnerContainer>
				<Button
					onClick={handleNavigateToPrevPage}
					variant={BUTTON_STYLES.onlyText}
					className={'w-[50px]'}
				>
					<div className={'flex items-center gap-2 '}>
						<ArrowLeft /> Назад
					</div>
				</Button>

				<FooterButtonsContainer>
					<Button
						onClick={() => handlePublishProduct('draft')}
						variant={BUTTON_STYLES.withoutBackground}
						size='large'
					>
						<div className={'flex items-center gap-2 '}>
							Сохранить как черновик
						</div>
					</Button>

					<Button
						onClick={() => handlePublishProduct('publish')}
						variant={BUTTON_STYLES.primaryCta}
						size='large'
					>
						Опубликовать
					</Button>
				</FooterButtonsContainer>
			</FooterInnerContainer>
		</FooterContainer>
	)
}

export default FooterPreviewProduct
