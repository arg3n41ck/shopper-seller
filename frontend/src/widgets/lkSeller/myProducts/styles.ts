import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const ProductsContainer = styled.div`
  padding: 20px 24px;
`;

export const MyProductsHeaderText = styled.p`
  font-weight: 600;
  font-size: 23.04px;
  line-height: 28px;
  color: ${palette.SHADES[100]};
`;

export const MyProductsFiltersAndButtonContainer = styled.div`
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MyProductsFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MyProductCreateHeaderText = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  color: ${palette.NEUTRAL[900]};
`;
