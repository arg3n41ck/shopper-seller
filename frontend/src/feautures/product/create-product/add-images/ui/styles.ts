import styled from 'styled-components'
import * as palette from '@/shared/lib/consts/styles'
import Image from 'next/image'

export const ImagesContainer = styled.div`
	width: 100%;
	overflow-x: auto;
`

export const ContainerImage = styled.div`
	/* width: 100%; */
	display: flex;
	/* align-items: center; */
	gap: 16px;
	overflow-x: scroll; /* Добавляет горизонтальный скролл при нехватке места */
	white-space: nowrap; /* Отменяет перенос текста на новую строку */
`

export const AddNewBrowseImage = styled.div`
	max-width: 253px;
	width: 100%;
	height: 235px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid ${palette.NEUTRAL[900]};
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.1s ease-in-out;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}
`

export const AddNewBroseImageTitle = styled.p`
	font-weight: 600;
	font-size: 18px;
	line-height: 22px;
	color: ${palette.SHADES[100]};
`

export const FileUploadLabel = styled.label`
	width: 150px;
	height: 187px;
	position: relative;
	display: inline-block;
	border: 1px solid ${palette.NEUTRAL[900]};
	border-radius: 5px;
	cursor: pointer;
	overflow: hidden;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}

	input[type='file'] {
		opacity: 0;
		z-index: 4;
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
`

export const ImageInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 150px;
	height: 187px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
`

export const ImageOfProduct = styled(Image)<{ $isMainImage: boolean }>`
	position: relative;
	width: 150px;
	height: 187px;
	border: 2px solid
		${({ $isMainImage }) =>
			$isMainImage ? palette.PRIMARY.dashboard[600] : 'transparent'};
	border-radius: 5px;
	cursor: pointer;
	object-fit: cover;

	&:hover {
		border-color: ${palette.PRIMARY.dashboard[600]};
	}
`
