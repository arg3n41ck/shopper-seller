import * as palette from '@/shared/lib/consts/styles'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const WrapperSideBar = styled(motion.div)<{ open: boolean }>`
	height: 100%;
	display: flex;
	flex-direction: column;
	position: fixed;
	background-color: ${palette.SHADES[50]};
	gap: 40px;
`

export const MenuCont = styled.div`
	cursor: pointer;
`

export const LogoCont = styled.div`
	max-width: 312px;
	padding: 15px 24px;

	background-color: ${palette.SHADES[50]};
`

export const LogoInfoCont = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
`

export const ListBlock = styled(motion.ul)<{ open: boolean }>`
	max-width: ${({ open }) => (open ? 288 : 60)}px;
	display: grid;
	grid-template-columns: 1fr;

	.logOut {
		margin-top: 95px;

		&:hover {
			background-color: ${palette.ERROR[300]};
		}

		&:active {
			background-color: ${palette.ERROR[500]};
		}
	}
`

export const SideBarRouter = styled.li<{ $active?: boolean; open?: boolean }>`
	position: relative;
	cursor: pointer;
	background: ${p => (p.$active ? palette.NEUTRAL[900] : 'none')};
	/* border-radius: 5px; */
	padding: 16px 16px 16px 24px;
	transition: all 0.1s ease-in-out;

	.router_info {
		display: flex;
		gap: 37px;
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		color: ${p => (p.$active ? palette.SHADES[50] : palette.NEUTRAL[900])};
		text-decoration: none;

		p {
			white-space: nowrap;
		}
	}

	&:hover {
		background-color: ${p =>
			p.$active ? palette.NEUTRAL[900] : palette.NEUTRAL[200]};
	}

	&:active {
		.logOut-text {
			color: ${palette.SHADES[50]};
		}
	}
`
