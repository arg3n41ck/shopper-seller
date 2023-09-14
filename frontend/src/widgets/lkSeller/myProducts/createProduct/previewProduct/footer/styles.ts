import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const FooterContainer = styled.div`
  margin-top: 170px;
`;

export const FooterInnerContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SaveToDraftText = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${palette.PRIMARY.dashboard[600]};
  cursor: pointer;
`;

export const FooterButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const FooterLine = styled.div`
  border: 1px solid ${palette.NEUTRAL[300]};
`;
