import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const NameOfColorText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;

  span {
    color: ${palette.SHADES[100]};
  }
`;

export const SizesContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const SizeBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12.5px;
  border: 1px solid ${palette.NEUTRAL[400]};
  cursor: pointer;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${palette.NEUTRAL[500]};
  }

  &.active {
    border-color: ${palette.NEUTRAL[900]};
    border-radius: 6px;
    background: none !important;

    p {
      color: ${palette.NEUTRAL[900]};
    }
  }

  &:hover {
    background-color: ${palette.NEUTRAL[200]};

    p {
      color: ${palette.NEUTRAL[900]};
    }
  }
`;
