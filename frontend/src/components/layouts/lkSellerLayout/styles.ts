import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)<{ open: boolean }>`
  display: grid;
  grid-template-columns: ${({ open }) => (open ? 312 : 75)}px 1fr;
  min-height: 100vh;
  transition: grid-template-columns 0.1s ease-in-out;
`;

export const OutletWrapper = styled.div`
  height: 100%;
`;

export const HeaderAndOutletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 15px 23px;
`;

export const LkSellerSideBarContainer = styled.div``;
