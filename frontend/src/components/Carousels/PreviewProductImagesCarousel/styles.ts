import styled, { css } from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
`;

export const CarouselWrapper = styled.div`
  max-height: 690px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const SmallImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SmallImageInnerContainer = styled.div`
  width: 120px;
  opacity: 0.6;

  img {
    cursor: pointer;
    width: 120px;
    height: 120px;
    min-height: 103px;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }

  &.active {
    opacity: 1;
  }
`;

export const BigImageWrapper = styled.div`
  width: 475px;
  height: 633px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const ScrollButton = styled.button<{ $position: string }>`
  position: absolute;
  width: 120px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: rgba(23, 23, 23, 0.32);
  cursor: pointer;
  outline: none;
  z-index: 2;
  color: ${palette.SHADES[50]};

  ${({ $position }) =>
    $position === "top" &&
    css`
      top: 0;
    `}

  ${({ $position }) =>
    $position === "bottom" &&
    css`
      bottom: 0;
    `}
`;
