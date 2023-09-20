import React, { FC, memo, useCallback, useState } from 'react'
import { NameOfColorText, SizeBlock, SizesContainer } from './styles'

interface ChooseSizesProps {
	preview: any
}

type Size = { id: number; size: string }

const ChooseSizes: FC<ChooseSizesProps> = memo(({ preview }) => {
	const [selectedSizes, setSelectedSizes] = useState<Size[]>([])

	const handleSizeClick = useCallback(
		(size: Size) => {
			setSelectedSizes(prevSelectedSizes => {
				if (
					prevSelectedSizes.find(selectedSize => selectedSize.id === size.id)
				) {
					return prevSelectedSizes.filter(
						selectedSize => selectedSize.id !== size.id
					)
				}

				return [...prevSelectedSizes, size]
			})
		},
		[setSelectedSizes]
	)

	return (
		<div>
			<NameOfColorText>
				Цвет: <span>{preview?.color}</span>
			</NameOfColorText>

			<SizesContainer className={'mt-3'}>
				{preview?.size.map((item: Size) => (
					<SizeBlock
						key={item.id}
						className={`${
							selectedSizes.find(selectedSize => selectedSize.id === item.id)
								? 'active'
								: ''
						}`}
						onClick={() => handleSizeClick(item)}
					>
						<p>{item.size}</p>
					</SizeBlock>
				))}
			</SizesContainer>
		</div>
	)
})

export default ChooseSizes
