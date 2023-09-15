import { Search } from 'react-feather'
import styled from 'styled-components'
import * as palette from '@/shared/lib/consts/styles'

export const LKSellerHeaderCont = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`

export const LKSellerHeaderUserInfo = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20px;
`

export const SearchIcon = styled(Search)`
	cursor: pointer;
	color: ${palette.NEUTRAL[400]};
`

export const ShopNameOfSeller = styled.p`
	color: ${palette.NEUTRAL[900]};
	font-size: 18px;
	font-weight: 500;
`

export const EmailOfSeller = styled.p`
	font-weight: 400;
	font-size: 13.33px;
	color: ${palette.NEUTRAL[500]};
`

export const Avatar = styled.div`
	width: 43px;
	height: 43px;

	img {
		border-radius: 50%;
		cursor: pointer;
		height: 100%;
	}
`

export const UseInfoCont = styled.div``
