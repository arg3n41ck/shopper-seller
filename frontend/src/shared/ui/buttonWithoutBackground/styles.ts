import styled from "styled-components";

export const ButtonWithoutBackground = styled.button<{
  $padding?: string;
  $width?: string;
}>`
  width: ${({ $width }) => ($width ? $width : "fit-content")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $padding }) => $padding};
  border: 1px solid #171717;
  color: #171717;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
