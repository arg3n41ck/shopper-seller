import * as palette from '@/shared/lib/consts/styles'
import styled, { css } from 'styled-components'

export const Button = styled.button<{ disabled?: boolean }>`
	border: none;
	display: flex;
	font-weight: 600;
	font-size: 16px;
	width: min-content;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	white-space: nowrap;

	${({ disabled }) =>
		disabled &&
		css`
			background-color: ${palette.NEUTRAL[200]} !important;
			color: ${palette.NEUTRAL[400]};
		`}
`

export const PrimaryCTAButton = styled(Button)`
	color: ${palette.SHADES[50]};
	background-color: ${palette.PRIMARY.main[900]};
	transition: 0.1s all ease-in-out;

	&:hover {
		background-color: ${palette.NEUTRAL[500]};
	}
`

export const PrimaryCTAIndigoButton = styled(Button)`
	color: ${palette.SHADES[50]};
	background-color: ${palette.PRIMARY.dashboard[600]};
	transition: 0.1s all ease-in-out;

	&:hover {
		background-color: ${palette.PRIMARY.dashboard[800]};
	}
`

export const SecondaryCTAButton = styled(Button)`
	color: ${palette.SHADES[100]};
	background-color: ${palette.SHADES[50]};
	border: 1px solid ${palette.SHADES[100]};
	border-radius: 6px;
	transition: 0.1s all ease-in-out;

	&:hover {
		background-color: ${palette.NEUTRAL[200]};
	}

	${({ disabled }) =>
		disabled &&
		css`
			background-color: ${palette.NEUTRAL[200]} !important;
			border: 1px solid ${palette.NEUTRAL[400]};
			color: ${palette.NEUTRAL[400]};
			cursor: default;
		`}
`

export const WithoutBackgroundButton = styled(Button)`
	background: none;
	border: 1px solid #171717;
	font-weight: 500;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}
`

export const OnlyTextButton = styled(Button)`
	background: none;
	border: none;
	font-weight: 500;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}
`
