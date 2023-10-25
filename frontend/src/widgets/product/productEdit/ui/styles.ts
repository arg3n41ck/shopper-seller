import styled from 'styled-components'

export const HeadTitleOfPage = styled.p`
	color: #000;
	font-size: 23.04px;
	font-weight: 600;
`

export const VariantsBlock = styled.div`
	width: max-content;
	display: flex;
	padding: 8px 12px;
	align-items: center;
	gap: 12px;
	border-radius: 4px;
	background-color: #f8f8f8;

	p {
		color: #171717;
		font-size: 16px;
		font-weight: 500;
	}
`

export const VariantButton = styled.button<{ $active: boolean }>`
	display: flex;
	padding: 4px 8px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: ${({ $active }) => ($active ? '#171717' : '#fff')};
	color: ${({ $active }) => ($active ? '#fff' : '#171717')};
	font-size: 16px;
	font-weight: 500;
`

export const ColumnsOfFieldsContainer = styled.div`
	display: grid;
	grid-template-columns: 368px 1fr;
	grid-gap: 92px;
`

export const ColumnsNameOfFieldsText = styled.p`
	color: #171717;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
`
