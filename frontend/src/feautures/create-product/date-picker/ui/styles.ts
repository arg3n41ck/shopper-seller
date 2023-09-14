import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const DatePickerContainer = styled.div`
  max-width: 279px;
  width: 100%;
`;

export const DatePickerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DatePickerArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const DatePickerMonthText = styled.h2`
  color: ${palette.NEUTRAL[900]};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const DatePickerDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DatePickerWeekDays = styled.p`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.NEUTRAL[900]};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export const DatePickerDay = styled.div<{
  $inActiveMonth: boolean;
  $selected: boolean;
}>`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  background: ${({ $selected }) => ($selected ? "#DEE2E6" : "none")};
  color: ${({ $inActiveMonth }) =>
    !$inActiveMonth ? palette.NEUTRAL[900] : palette.NEUTRAL[400]};
  cursor: pointer;
  border-radius: 16px;
`;
