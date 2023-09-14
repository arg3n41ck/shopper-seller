import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as palette from '@/shared/lib/consts/styles';

export const OutsideContainer = styled(motion.div)`
  z-index: 1;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InnerContainer = styled.div`
  max-width: 528px;
  width: 100%;
  background-color: ${palette.NEUTRAL[50]};
  /* border-radius: 20px; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalContainer = styled.div``;

export const IconCont = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

export const HeaderTextsModalCont = styled.div`
  max-width: 385px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderTextModal = styled.p`
  font-weight: 600;
  font-size: 27.65px;
  line-height: 33px;
  color: ${palette.NEUTRAL[900]};
`;

export const TextModal = styled.p`
  font-weight: 400;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.NEUTRAL[900]};
`;

export const ModalInnerContainer = styled.div`
  padding: 46px 42px;
`;

export const ModalTextFieldsCont = styled.div`
  margin: 34px 0 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TextFieldCont = styled.div`
  display: flex;
  flex-direction: column;
`;
