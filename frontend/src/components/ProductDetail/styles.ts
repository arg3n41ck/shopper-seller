import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const NameOfProduct = styled.p`
  font-weight: 600;
  font-size: 27.65px;
  line-height: 33px;
  color: ${palette.NEUTRAL[900]};
`;

export const NameOfThePageText = styled.p`
  color: ${palette.NEUTRAL[900]};
  font-size: 28px;
  font-weight: 600;
`;

export const DescriptionOfProduct = styled.p`
  font-weight: 400;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.NEUTRAL[400]};
`;

export const PastPrice = styled.p`
  color: ${palette.NEUTRAL[800]};
  font-size: 16px;
  font-weight: 500;
  text-decoration: line-through;
`;

export const DiscountPrice = styled.p`
  color: ${palette.ERROR[700]};
  font-size: 24px;
  font-weight: 500;
`;

export const ColorText = styled.div`
  font-weight: 400;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.SHADES[100]};
`;

export const AddToCartContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Line = styled.div`
  border: 1px solid ${palette.NEUTRAL[300]};
`;

export const NameOfFieldText = styled.p`
  font-weight: 700;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.SHADES[100]};

  span {
    font-weight: 400;
    font-size: 13.33px;
    line-height: 16px;
    color: ${palette.SHADES[100]};
  }
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 30px 0;
  border-top: 1px solid #676767;
  border-bottom: 1px solid #676767;
`;

export const ProductDetailNameOfTheFields = styled.p<{
  $fontSize?: number;
  $fontWeight?: number;
}>`
  color: ${palette.NEUTRAL[900]};
  font-size: ${({ $fontSize }) => $fontSize || 16}px;
  font-weight: ${({ $fontWeight }) => $fontWeight || 500};
`;
