import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const LKSellerSettingsCont = styled.div`
	padding: 24px;
`

export const HeaderNameText = styled.p`
	font-size: 18px;
	line-height: normal;
	font-weight: 400;
	color: ${palette.SHADES[100]};
`

export const HeaderTitleText = styled.p`
	font-size: 24px;
	font-weight: 500;
	color: ${palette.SHADES[100]};
`

export const ChangeDataCont = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 60px;
`

export const IconAndInfoCont = styled.div`
	display: flex;
	align-items: center;
	gap: 52px;
`

export const NameFieldAndInfoCont = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

export const ChangeInfoCont = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const FieldNameText = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.SHADES[100]};
`

export const FieldInfoText = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.SHADES[100]};
`

export const Line = styled.div`
	width: 100%;
	border: 1px solid ${palette.NEUTRAL[400]};
`

export const HeaderTextsCont = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`
