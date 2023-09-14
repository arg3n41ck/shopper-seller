import { FC, ReactNode } from 'react';
import {
  LK_SELLER_STEP_PAGINATION,
  Slot,
} from '@/components/Layouts/CreateProductLayout/slots';

interface Props {
  children: ReactNode;
}

const CreateProductPaginationSlot: FC<Props> = ({ children }) => {
  return <Slot name={LK_SELLER_STEP_PAGINATION} children={children} />;
};

export default CreateProductPaginationSlot;
