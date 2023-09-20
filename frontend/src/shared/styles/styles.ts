import { motion } from 'framer-motion'
import Image from 'next/image'
import styled from 'styled-components'

export const PopupContent = styled(motion.div)`
	position: absolute;
	top: calc(100% + 10px);
	left: 50%;
	transform: translateX(-80%);
	background-color: #fff;
	padding: 20px;
	border: 1px solid #676767;
	z-index: 1;
`

export const ImageFromNext = styled(Image)`
	width: auto;
	height: auto;
`

export const ButtonInfoCont = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`
