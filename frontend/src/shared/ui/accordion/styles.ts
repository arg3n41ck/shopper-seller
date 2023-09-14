import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const AccordionContainer = styled.div`
  border-radius: 4px;
  overflow: hidden;
  padding: 12px 20px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const AccordionTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${palette.NEUTRAL[900]};
  margin: 0;
  flex: 1;
`;

export const AccordionIcon = styled.span<{ isOpen: boolean }>`
  margin-left: 16px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.1s ease-in-out;
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  margin-top: 10px;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.1s ease-in-out;
  /* padding: 0 16px 16px; */
`;
