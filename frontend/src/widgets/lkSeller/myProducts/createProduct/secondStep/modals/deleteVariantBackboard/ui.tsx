import { FC } from 'react';
import Backdrop from '@/components/Backdrop';
import {
  BackdropContainer,
  ButtonsBackdrop,
  CancelButtonBackdrop,
  DeleteButtonBackdrop,
  HeaderTextBackdrop,
} from '@/components/Backdrop/styles';

interface Props {
  open: boolean;
  onClose: () => void;
  deleteVariant: () => void;
}

const DeleteVariantBackdrop: FC<Props> = ({ open, onClose, deleteVariant }) => {
  return (
    <Backdrop open={open} onClose={onClose}>
      <BackdropContainer>
        <HeaderTextBackdrop>
          Вы действительно хотите удалить?
        </HeaderTextBackdrop>
        <ButtonsBackdrop>
          <CancelButtonBackdrop onClick={onClose}>Отмена</CancelButtonBackdrop>
          <DeleteButtonBackdrop onClick={deleteVariant}>
            Удалить
          </DeleteButtonBackdrop>
        </ButtonsBackdrop>
      </BackdropContainer>
    </Backdrop>
  );
};

export default DeleteVariantBackdrop;
