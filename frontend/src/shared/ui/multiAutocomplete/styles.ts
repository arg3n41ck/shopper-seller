import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const AutocompleteContainer = styled.div<{ error: boolean | undefined }>`
  max-width: 255px;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 23.5px;
  position: relative;
`;

export const Input = styled.input<{ error: boolean | undefined }>`
  width: 100%;
  font-size: 16px;
  border: 1px solid
    ${({ error }) => (error ? palette.ERROR[500] : palette.SHADES[100])};
  padding: 12px 20px;
  border-radius: 8px;
  background: none;
  outline: none;

  &::placeholder {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: ${({ error }) => (error ? palette.ERROR[500] : palette.SHADES[100])};
  }
`;

export const SelectedOptionCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 21.5px;
`;

export const SelectedOption = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  color: ${palette.NEUTRAL[900]};
  border-radius: 6px;
  background-color: ${palette.NEUTRAL[300]};
  font-size: 13.33px;
  gap: 6px;
`;

export const OptionList = styled.ul`
  width: 100%;
  position: absolute;
  top: 100%;
  border: 1px solid ${palette.SHADES[100]};
  border-radius: 8px;
  background-color: #fff;
  z-index: 2;
  max-height: 200px;
  overflow-y: scroll;
  margin-top: 5px;
`;

export const Option = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.NEUTRAL[100]};
  }
`;

export const AutocompleteIconCont = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ChevronDownIconCont = styled.div<{ open: boolean }>`
  cursor: pointer;
  position: absolute;
  right: 0;
  right: 20px;
  z-index: 1;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.1s ease-in-out;
`;
