import React, { FC, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InnerContainer, OutsideContainer } from './styles'

interface Props {
	children: ReactNode
	open: boolean
	onClose: () => void
}

const backdropVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
}

const Backdrop: FC<Props> = ({ children, open, onClose }) => {
	return (
		<AnimatePresence>
			{open && (
				<OutsideContainer
					onClick={onClose}
					variants={backdropVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					<InnerContainer onClick={e => e.stopPropagation()}>
						{children}
					</InnerContainer>
				</OutsideContainer>
			)}
		</AnimatePresence>
	)
}

export default Backdrop
