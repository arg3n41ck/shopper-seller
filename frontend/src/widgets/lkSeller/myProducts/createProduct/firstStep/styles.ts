import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const InfoAboutProductWrapper = styled.div`
	max-width: 528px;
	/* margin-bottom: 300px; */
`

export const InfoAboutProductContainer = styled.div`
	display: grid;
	align-items: flex-start;
	grid-template-columns: 412px 251px;
	grid-gap: 25px;
`

export const HeadTextInfoAboutProduct = styled.p`
	font-weight: 500;
	font-size: 18px;
	line-height: 28px;
	color: ${palette.NEUTRAL[900]};
`

export const FormsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 70px;
	margin-top: 65px;
`

export const HeadTextOfForm = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: ${palette.SHADES[100]};
`

export const FormAndHeadTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
`

export const FormContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 25px;
`

export const ChildFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`

export const InputWithIconCont = styled.div`
	display: flex;
	align-items: center;
	gap: 19px;
`

export const SelectedOptionsType = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 68px;
	grid-gap: 24px;
	align-items: center;
`
