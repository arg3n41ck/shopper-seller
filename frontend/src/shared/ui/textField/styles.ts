import styled from 'styled-components';
import * as palette from '@/shared/lib/consts/styles';

export const TextFieldCont = styled.div`
  position: relative;
  /* height: 40px; */
  display: flex;
  grid-gap: 16px;
  align-items: center;
  border: 1px solid ${palette.NEUTRAL[300]};
  /* border-radius: 6px; */
  padding: 13px 16px;

  color: ${palette.SHADES[100]};

  &.error {
    border-color: ${palette.ERROR[500]} !important;
  }

  &.active {
    border-color: ${palette.NEUTRAL[900]};
  }
`;

export const TextFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TFLabel = styled.label`
  font-weight: 400;
  font-size: 13.33px;
  color: ${palette.NEUTRAL[900]};
`;

export const TFHelperText = styled.label`
  font-weight: 400;
  font-size: 11.11px;
  color: ${palette.NEUTRAL[400]};
`;

export const TFErrorText = styled.label`
  font-weight: 400;
  font-size: 11.11px;
  color: ${palette.ERROR[500]};
`;

export const TFInput = styled.input<{ value: string }>`
  border: none;
  outline: none;
  background: none;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
  color: ${palette.NEUTRAL[900]};

  &.error {
    color: ${palette.ERROR[500]};
  }

  &::-webkit-calendar-picker-indicator {
    width: 100%;
    height: 100%;
    position: absolute;
    left: -2px;
    border-radius: 8px;
    opacity: 0;
    z-index: 1;
  }

  &::-webkit-datetime-edit {
    color: ${({ value }) => (value ? palette.SHADES[100] : 'transparent')};
  }

  &:focus::-webkit-datetime-edit {
    color: ${palette.SHADES[100]};
  }

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${palette.NEUTRAL[400]};
  }
`;

export const EndAdornmentCont = styled.div`
  color: ${palette.NEUTRAL[400]};

  &.active {
    color: ${palette.NEUTRAL[900]};
  }
`;
