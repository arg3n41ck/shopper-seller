import * as palette from '@/shared/lib/consts/styles'
import Image from 'next/image'
import styled from 'styled-components'

export const ProductsContainer = styled.div`
	padding: 20px 24px;
`

export const MyProductsHeaderText = styled.p`
	font-weight: 600;
	font-size: 23.04px;
	line-height: 28px;
	color: ${palette.SHADES[100]};
`

export const MyProductsFiltersAndButtonContainer = styled.div`
	margin-top: 27px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 20px;
	border: 1px solid #dbdbdb;
	border-bottom: none;
`

export const MyProductsFiltersContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`

export const MyProductCreateHeaderText = styled.p`
	font-weight: 700;
	font-size: 33.18px;
	line-height: 40px;
	color: ${palette.NEUTRAL[900]};
`

export const ProductImage = styled(Image)`
	width: 36px;
	height: 36px;
	border-radius: 36px;
	object-fit: cover;
`

export const ProductsFilterAndSearchContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`
