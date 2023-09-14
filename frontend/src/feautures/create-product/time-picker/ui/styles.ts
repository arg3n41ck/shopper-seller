import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const TimerPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TimerPickerInput = styled.input<{ $hasValue: boolean }>`
  width: 74px;
  height: 81px;
  border-radius: 5px;
  background-color: ${({ $hasValue }) =>
    $hasValue ? "rgba(79, 70, 229, 0.25)" : "rgba(103, 103, 103, 0.25)"};
  text-align: center;
  color: ${({ $hasValue }) =>
    $hasValue ? palette.PRIMARY.dashboard[600] : palette.NEUTRAL[900]};
  font-size: 42px;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s ease-in-out;
  outline: none;

  &:focus {
    background-color: rgba(79, 70, 229, 0.25);

    &::placeholder {
      color: ${palette.PRIMARY.dashboard[600]};
    }
  }

  &::placeholder {
    color: ${palette.NEUTRAL[900]};
  }
`;

export const TimerPickerSplitText = styled.p`
  color: ${palette.SHADES[100]};
  font-size: 42px;
  font-weight: 600;
`;
