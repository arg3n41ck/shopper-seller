import { FC, ReactNode } from 'react';
import {
  OutsideContainer,
  InnerContainer,
  ModalContainer,
  IconCont,
} from './styles';
import { X } from 'react-feather';
import { AnimatePresence } from 'framer-motion';

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  style?: object;
}

const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Modal: FC<Props> = ({ children, open, onClose, style }) => {
  return (
    <AnimatePresence>
      {open && (
        <OutsideContainer
          onClick={onClose}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <InnerContainer onClick={(e) => e.stopPropagation()} style={style}>
            <ModalContainer>
              <IconCont onClick={onClose}>
                <X size={24} />
              </IconCont>
              {children}
            </ModalContainer>
          </InnerContainer>
        </OutsideContainer>
      )}
    </AnimatePresence>
  );
};

export default Modal;
