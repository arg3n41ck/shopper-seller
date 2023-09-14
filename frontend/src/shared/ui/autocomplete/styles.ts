import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const ChevronDownIconCont = styled.div<{ open: boolean }>`
	cursor: pointer;
	position: absolute;
	right: 15px;
	transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
	transition: all 0.1s ease-in-out;
	color: ${palette.NEUTRAL[400]};

	&.active {
		color: ${palette.NEUTRAL[900]};
	}

	&.error {
		color: ${palette.ERROR[500]};
	}
`

export const AutocompleteWrapper = styled.div<{ $width: string | undefined }>`
	position: relative;
	max-width: ${({ $width }) => ($width ? $width : '255px')};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
`

export const InputLabel = styled.label`
	font-weight: 400;
	font-size: 13.33px;
	line-height: 16px;
	color: ${palette.NEUTRAL[900]};
`

export const AutocompleteInput = styled.input`
	width: 100%;
	padding: 11px 40px 11px 11px;
	font-size: 16px;
	border: 1px solid ${palette.NEUTRAL[300]};
	color: ${palette.NEUTRAL[400]};
	/* border-radius: 6px; */
	outline: none;
	background: none;

	&.active {
		color: ${palette.NEUTRAL[900]};
		border-color: ${palette.NEUTRAL[900]};
	}

	&.error {
		color: ${palette.ERROR[500]};
		border-color: ${palette.ERROR[500]};
	}
`

export const ErrorText = styled.label`
	font-weight: 400;
	font-size: 11.11px;
	color: ${palette.ERROR[500]};
`

export const HelperText = styled.label`
	font-weight: 400;
	font-size: 11.11px;
	color: ${palette.NEUTRAL[400]};
`

export const AutocompleteList = styled.ul`
	width: 100%;
	position: absolute;
	top: 100%;
	z-index: 1;
	background-color: ${palette.SHADES[50]};
	border: 1px solid ${palette.NEUTRAL[300]};
	/* border-radius: 8px; */
	overflow-y: auto;
	max-height: 200px;
`

export const AutocompleteItem = styled.li`
	padding: 8px;
	font-size: 16px;
	cursor: pointer;

	&:hover {
		background-color: ${palette.NEUTRAL[100]};
	}
`
