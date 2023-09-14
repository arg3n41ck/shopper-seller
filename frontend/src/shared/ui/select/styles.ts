import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const SelectWrapper = styled.div`
  position: relative;
`;

export const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 8px 9px;
  border: 1px solid ${palette.NEUTRAL[300]};
  color: ${palette.NEUTRAL[400]};
  cursor: pointer;
  /* border-radius: 6px; */
  user-select: none;

  &.active {
    color: ${palette.NEUTRAL[900]};
    border-color: ${palette.NEUTRAL[900]};
  }

  &.error {
    border-color: ${palette.ERROR[500]};
  }
`;

export const SelectLabel = styled.label`
  font-weight: 400;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.NEUTRAL[900]};
`;

export const OptionsList = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${palette.SHADES[50]};
  border: 1px solid ${palette.NEUTRAL[300]};
  z-index: 1;
`;

export const Option = styled.li`
  display: block;
  height: auto;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.NEUTRAL[300]};
  }
`;

export const IconCont = styled.div<{ open: boolean }>`
  position: absolute;
  right: 15px;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.1s ease-in-out;
`;

export const ErrorText = styled.label`
  font-weight: 400;
  font-size: 11.11px;
  color: ${palette.ERROR[500]};
`;
