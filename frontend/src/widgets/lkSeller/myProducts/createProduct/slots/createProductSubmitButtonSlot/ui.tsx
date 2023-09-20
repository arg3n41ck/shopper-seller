import React, { FC, ReactNode } from 'react'
import {
	LK_SELLER_STEP_SUBMIT_BUTTON,
	Slot,
} from '@/components/layouts/createProductLayout/slots'

interface Props {
	children: ReactNode
}

const CreateProductSubmitButtonSlot: FC<Props> = ({ children }) => {
	return <Slot name={LK_SELLER_STEP_SUBMIT_BUTTON} children={children} />
}

export default CreateProductSubmitButtonSlot
