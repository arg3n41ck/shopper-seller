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

export const ImagesContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ImageBlock = styled.div`
  width: 63px;
  height: 85px;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
