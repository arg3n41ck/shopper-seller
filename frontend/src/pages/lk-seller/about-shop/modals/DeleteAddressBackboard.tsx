import { FC } from "react";
import Backdrop from "@/components/Backdrop";
import {
  BackdropContainer,
  ButtonsBackdrop,
  CancelButtonBackdrop,
  DeleteButtonBackdrop,
  HeaderTextBackdrop,
} from "@/components/Backdrop/styles";

interface Props {
  open: boolean;
  onClose: () => void;
  deleteAddress: () => void;
}

const DeleteAddressBackdrop: FC<Props> = ({ open, onClose, deleteAddress }) => {
  return (
    <Backdrop open={open} onClose={onClose}>
      <BackdropContainer>
        <HeaderTextBackdrop>
          Вы действительно хотите удалить?
        </HeaderTextBackdrop>
        <ButtonsBackdrop>
          <CancelButtonBackdrop onClick={onClose}>Отмена</CancelButtonBackdrop>
          <DeleteButtonBackdrop onClick={deleteAddress}>
            Удалить
          </DeleteButtonBackdrop>
        </ButtonsBackdrop>
      </BackdropContainer>
    </Backdrop>
  );
};

export default DeleteAddressBackdrop;
