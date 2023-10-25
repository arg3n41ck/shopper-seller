import React, { FC, useState } from 'react'
import {
	ContainerImage,
	FileUploadLabel,
	ImageOfProduct,
	ImageInfo,
	ImagesContainer,
} from './styles'
import { Plus } from 'react-feather'
import { NEUTRAL } from '@/shared/lib/consts/styles'

export type SizeQuantityType = { size: string; quantity: string }

interface AddImagesProps {
	value: any
	fieldTitle: string
	className?: string
	onChange: (name: string, value: any) => void
}

export const AddImages: FC<AddImagesProps> = ({
	value,
	fieldTitle,
	className,
	onChange,
}) => {
	const isMainImage = (index: number) => value[index]?.main_image

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files
		if (files && files?.length) {
			const images = Array.from(files).map(file => ({
				image: file,
				main_image: false,
			}))

			onChange(fieldTitle, [...value, ...images])
		}
	}

	return (
		<ImagesContainer className={className}>
			<ContainerImage>
				{!!value?.length &&
					value.map((item: any, index: number) => {
						const image =
							typeof item.image === 'string'
								? item.image
								: URL.createObjectURL(item.image)

						return (
							<ImageOfProduct
								key={index}
								onClick={() =>
									onChange(
										`${fieldTitle}.${index}.main_image`,
										!isMainImage(index)
									)
								}
								$isMainImage={isMainImage(index)}
								src={image}
								width={150}
								height={187}
								alt={`image ${index}`}
							/>
						)
					})}

				<div>
					<FileUploadLabel htmlFor={'user-logo'}>
						<input
							id='user-logo'
							name={'image'}
							accept='image/*'
							onChange={e => handleImagesChange(e)}
							type='file'
							multiple
						/>

						<ImageInfo>
							<Plus size={46} color={NEUTRAL[900]} />
						</ImageInfo>
					</FileUploadLabel>
				</div>
			</ContainerImage>
		</ImagesContainer>
	)
}
