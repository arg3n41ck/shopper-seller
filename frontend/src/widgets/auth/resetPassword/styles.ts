import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const ChangePasswordCont = styled.div`
	display: flex;
	align-items: flex-end;
	margin-bottom: 29px;
`

export const SendedToEmail = styled.div`
	max-width: 200px;
	font-weight: 500;
	font-size: 14px;
	line-height: 17px;
	color: ${palette.NEUTRAL[500]};
`

export const ChangeThePassword = styled.p`
	font-weight: 500;
	font-size: 14px;
	line-height: 17px;
	text-decoration-line: underline;
	color: ${palette.NEUTRAL[500]};
	cursor: pointer;
`

export const ResetPasswordContainer = styled.div`
	max-width: 436px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
`

export const TextFieldContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 12px;
	position: relative;
`

export const ResendSMSText = styled.p`
	color: #b91c1c;
	font-size: 16px;
	font-weight: 500;
	text-align: right;

	@media screen and (max-width: 578px) {
		text-align: left;
	}
`

export const TimerContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	color: #676767;
	position: absolute;
	right: -80px;
	top: 10px;

	@media screen and (max-width: 578px) {
		position: relative;
		right: 0;
		top: 0;
		justify-content: flex-end;
	}
`
