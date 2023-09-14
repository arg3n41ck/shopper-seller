import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const VariantsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const PreviewVariantsContainer = styled.div`
  max-width: 528px;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  overflow-x: scroll;
  /* flex-wrap: wrap; */
`;

export const PreviewVariant = styled.div`
  max-width: 160px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  /* border: 2px solid ${palette.NEUTRAL[50]}; */
  height: 100%;
  cursor: pointer;

  &:hover {
    border-color: ${palette.PRIMARY.dashboard[600]};
  }
`;

export const PreviewVariantsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SizesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Size = styled.div`
  font-weight: 400;
  color: #676767;
  font-size: 12px;
  font-weight: 400;
`;

export const TitleText = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: ${palette.NEUTRAL[900]};
`;

export const DescriptionText = styled.p`
  color: #262626;
  font-size: 14px;
  font-weight: 400;
`;

export const ResidueText = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${palette.NEUTRAL[900]};
`;

export const PriceText = styled.p`
  font-weight: 600;
  font-size: 19.2px;
  line-height: 33px;
  color: ${palette.NEUTRAL[900]};
`;

export const AddNewVariantContainer = styled.div`
  max-width: 268px;
  width: 100%;
  height: 416px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  border: 2px solid ${palette.NEUTRAL[900]};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${palette.NEUTRAL[100]};
  }
`;

export const AddVariantText = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${palette.SHADES[100]};
`;
