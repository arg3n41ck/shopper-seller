import styled from "styled-components";

export const AddTagsContainer = styled.div`
  max-width: 490px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TagBlock = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid #171717;
  padding: 4px 8px;
  gap: 8px;
  cursor: pointer;
`;

export const TagText = styled.span`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;

export const TagCloseButton = styled.span`
  cursor: pointer;
`;
