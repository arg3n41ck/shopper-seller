import styled from 'styled-components';
import * as palette from '@/shared/lib/consts/styles';

export const HeaderText = styled.p`
  color: ${palette.SHADES[100]};
  font-weight: 500;
  font-size: 24px;
`;

export const SuccessActionCont = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CheckCircleIconCont = styled.div`
  margin: 42px 0;
  width: 120px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #4fd26c;
  opacity: 0.15;
  position: absolute;
`;

export const CheckIconBlock = styled.div`
  z-index: 1;
  position: relative;
`;
