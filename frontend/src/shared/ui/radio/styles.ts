import styled from 'styled-components';
import * as palette from '@/shared/lib/consts/styles';

export const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  grid-column-gap: 8px;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + span:before {
    background-color: ${palette.SHADES[100]};
  }

  &:checked + span:after {
    opacity: 1;
  }
`;

export const ChildrenText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${palette.SHADES[100]};
`;

export const RadioLabel = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${palette.SHADES[100]};

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: transparent;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${palette.NEUTRAL[100]};
  }
`;
