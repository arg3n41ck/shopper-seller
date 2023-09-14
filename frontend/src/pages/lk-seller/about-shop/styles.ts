import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const AboutShopContainer = styled.div`
	padding: 28px 24px;
`

export const AddNewAddressContainer = styled.div`
	max-width: 252px;
	min-height: 226px;
	height: min-content;
	width: 100%;
	border: 1px solid ${palette.NEUTRAL[600]};
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 17px;
	cursor: pointer;
	transition: background-color 0.1s ease-in-out;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}
`

export const AddNewAddressText = styled.div`
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.SHADES[100]};
`

export const ShopInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin-bottom: 35px;
`

export const ShopHeaderInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 25px;
`

export const Avatar = styled.div`
	width: 95px;
	height: 95px;

	img {
		border-radius: 50%;
		cursor: pointer;
		height: 100%;
	}
`

export const ShopNameAndEmailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`

export const InfoAboutShopText = styled.p`
	color: #171717;
	font-size: 18px;
	font-weight: 500;
`

export const ShopNameText = styled.p`
	font-weight: 600;
	font-size: 28px;
	color: ${palette.NEUTRAL[900]};
`

export const ShopEmailText = styled.p`
	font-weight: 400;
	font-size: 16px;
	color: ${palette.NEUTRAL[400]};
`

export const ShopEditText = styled.p`
	color: #676767;
	font-size: 16px;
	font-weight: 400;
	cursor: pointer;
`

export const IconAndInfoContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 68px;
`

export const ShopEditInfo = styled.div`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const ShopFieldsInfo = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-row-gap: 29px;
`

export const FieldsCont = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

export const FieldName = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.NEUTRAL[900]};
`

export const FieldInfo = styled.p`
	word-wrap: break-word;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.NEUTRAL[900]};
`

export const Line = styled.div`
	border: 1px solid ${palette.NEUTRAL[400]};
`

export const ShopAddressesInfoContainer = styled.div`
	margin: 24px 0;
`

export const AddressesContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 28px;
	justify-items: flex-start;
`

export const AddressContainer = styled.div`
	max-width: 252px;
	min-height: 226px;
	height: min-content;
	width: 100%;
	padding: 12px 16px;
	background: ${palette.NEUTRAL[50]};
	border: 1px solid ${palette.NEUTRAL[600]};
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	gap: 34px;

	&.active {
		gap: 0;
	}
`

export const AddressHeaderInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const AddressHeaderText = styled.p`
	font-weight: 600;
	font-size: 23.04px;
	line-height: 28px;
	color: ${palette.NEUTRAL[900]};
`

export const AddressFieldsInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 17px;
`

export const AddressEditIcons = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`
