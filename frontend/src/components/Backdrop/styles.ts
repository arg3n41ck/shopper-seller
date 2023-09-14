import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as palette from "@/shared/lib/consts/styles";

export const OutsideContainer = styled(motion.div)`
  z-index: 3;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InnerContainer = styled.div``;

export const BackdropContainer = styled.div`
  max-width: 322px;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;
  background-color: ${palette.SHADES[50]};
  border-radius: 6px;
`;

export const HeaderTextBackdrop = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: ${palette.SHADES[100]};
`;

export const ButtonsBackdrop = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const ButtonBackdrop = styled.button`
  font-size: 16px;
  line-height: 19px;
  padding: 4px;
`;

export const CancelButtonBackdrop = styled(ButtonBackdrop)`
  color: ${palette.NEUTRAL[900]};
  font-weight: 400;
`;

export const DeleteButtonBackdrop = styled(ButtonBackdrop)`
  color: ${palette.ERROR[500]};
  font-weight: 600;
`;
