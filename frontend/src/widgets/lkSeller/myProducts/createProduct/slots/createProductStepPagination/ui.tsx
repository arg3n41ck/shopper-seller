import { LK_SELLER_STEP_PAGINATION, Slot } from '@/components/layouts/createProductLayout/slots'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CreateProductPaginationSlot: FC<Props> = ({ children }) => {
  return <Slot name={LK_SELLER_STEP_PAGINATION}>{children}</Slot>
}

export default CreateProductPaginationSlot
