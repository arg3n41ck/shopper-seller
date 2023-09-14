import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const StyledCarouselWrapper = styled.div`
  position: relative;
  max-height: 280px;
  max-width: 252px;
`;

export const StyledCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .swiper-pagination-bullet {
    background-color: ${palette.NEUTRAL[50]};
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background-color: ${palette.NEUTRAL[50]};
    opacity: 1;
  }

  /* .swiper-horizontal {
    border-radius: 10px;
  } */
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

export const StyledButtonLeft = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  height: 100%;
  color: ${palette.NEUTRAL[400]};
  padding-left: 5px;
  z-index: 1;
  cursor: pointer;
`;

export const StyledButtonRight = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  height: 100%;
  color: ${palette.NEUTRAL[400]};
  padding-right: 5px;
  z-index: 1;
  cursor: pointer;
`;

export const StyledCarouselIndicators = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  bottom: 17px;
  left: 50%;
  transform: translate(-50%);
`;

export const StyledCarouselIndicator = styled.span<{ isActive: boolean }>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? palette.NEUTRAL[50] : palette.NEUTRAL[400]};
  cursor: pointer;
`;

export const StyledSlide = styled.img<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? "block" : "none")};
  width: 100%;
  border-radius: 10px;
  height: 280px;
`;

export const DeleteIconContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  color: ${palette.NEUTRAL[400]};
  z-index: 2;
  cursor: pointer;
  /* color: ${palette.NEUTRAL[800]}; */
`;
