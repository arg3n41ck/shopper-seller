import { Search } from "react-feather";
import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const LKSellerHeaderCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const LKSellerHeaderUserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

export const SearchIcon = styled(Search)`
  cursor: pointer;
  color: ${palette.NEUTRAL[400]};
`;

export const ShopNameOfSeller = styled.p`
  font-weight: 400;
  font-size: 19.2px;
  line-height: 23px;
  color: ${palette.NEUTRAL[900]};
`;

export const EmailOfSeller = styled.p`
  font-weight: 400;
  font-size: 13.33px;
  line-height: 16px;
  color: ${palette.NEUTRAL[500]};
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;

  img {
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const UseInfoCont = styled.div``;
