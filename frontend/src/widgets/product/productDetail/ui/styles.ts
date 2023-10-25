import styled from 'styled-components'

export const ProductDetailContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 40px;
`

export const HeadTitleOfPage = styled.p`
	color: #000;
	font-size: 23.04px;
	font-weight: 600;
`

export const TitleOfProduct = styled.p`
	color: #171717;
	font-size: 32px;
	font-weight: 500;
`

export const DescriptionOfProduct = styled.p`
	color: #676767;
	font-size: 16px;
	font-weight: 400;
`

export const TitleOfFieldProduct = styled.p`
	color: #676767;
	font-size: 12px;
	font-weight: 500;
`

export const TitleOfValueFieldProduct = styled.p`
	color: #171717;
	font-size: 16px;
	font-weight: 500;
`

export const HeaderProductImageAndInfoContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 70px;
`

export const HeaderProductInfoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 16px;
`

export const HeaderProductContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
`

export const TitleOfBlocks = styled.p`
	color: #000;
	font-size: 18px;
	font-weight: 500;
`

export const TitleOfFieldInBlock = styled.p`
	color: #676767;
	font-size: 14px;
	font-weight: 500;
`

export const TItleOfFieldValueInBlock = styled.p`
	color: #171717;
	font-size: 16px;
	font-weight: 500;
`

export const MainInfoProductContainer = styled.div`
	max-width: 519px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 24px;
`

export const MainInfoProductInnerBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const ContainerOfBlocks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

export const ExtraInfoProductContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 24px;
`

export const ProductDetailVariantsContainer = styled.div`
	max-width: 528px;
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 24px;
	overflow-x: scroll;
`
