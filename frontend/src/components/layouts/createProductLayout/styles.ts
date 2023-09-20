import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const StepsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 266px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 42px;
  margin-bottom: 55px;
`;

export const StepsBlockWithText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const StepsText = styled.p`
  font-weight: 600;
  font-size: 23.04px;
  line-height: 28px;
  color: ${palette.SHADES[100]};
`;

export const StepsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StepBlock = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${palette.NEUTRAL[300]};
  border-radius: 50%;
  cursor: pointer;

  &.active {
    background-color: ${palette.PRIMARY.dashboard[600]};
  }
`;
