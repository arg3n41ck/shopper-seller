import * as palette from '@/shared/lib/consts/styles'
import styled from 'styled-components'

export const ForgetThePassword = styled.p`
  color: #b91c1c;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-align: right;
`

export const LoginPageText = styled.p`
  color: ${palette.SHADES[100]};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`

export const TextWithIconContainer = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

export const TextWithIconText = styled.p`
  color: #171717;
  font-size: 20px;
  font-weight: 500;
`

export const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`

export const MainInfoTextsContainer = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const FormContainer = styled.div`
  max-width: 434px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const MainText = styled.h1`
  color: ${palette.SHADES[100]};
  font-size: 60px;
  font-weight: 600;
`

export const NameOfProjectText = styled.p`
  color: ${palette.SHADES[100]};
  font-size: 60px;
  font-weight: 500;
`

export const DescriptionText = styled.p`
  color: #676767;
  font-size: 22px;
  font-weight: 400;
`
