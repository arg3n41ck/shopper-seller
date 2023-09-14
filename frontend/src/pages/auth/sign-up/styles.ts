import styled from "styled-components";

export const SignUpContainer = styled.div`
  margin: 0 auto;
  max-width: 436px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SignUpTextFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TypeRoleOfRegistration = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 78px;

  @media screen and (max-width: 578px) {
    justify-items: center;
  }
`;

export const ChooseRoleCont = styled.div`
  max-width: 255px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 57px;
  justify-items: center;
`;

export const IconCont = styled.div`
  display: flex;
  justify-content: center;
`;
