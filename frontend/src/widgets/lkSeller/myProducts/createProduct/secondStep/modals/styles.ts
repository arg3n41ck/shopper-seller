import styled from "styled-components";
import * as palette from "@/shared/lib/consts/styles";

export const HeaderText = styled.p`
  color: ${palette.SHADES[100]};
  font-size: 24px;
  font-weight: 500;
`;

export const TitleAndPriceVariantContainer = styled.div`
  max-width: 482px;
`;

export const TitleField = styled.p`
  color: ${palette.NEUTRAL[900]};
  font-size: 18px;
  font-weight: 500;
`;

export const SizeAndQuantityVariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SizeAndQuantityVariantFields = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleAddBroseImage = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${palette.PRIMARY.dashboard[600]};
`;

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const AddNewBrowseImage = styled.div`
  max-width: 253px;
  width: 100%;
  height: 235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.NEUTRAL[900]};
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${palette.NEUTRAL[100]};
  }
`;

export const AddNewBroseImageTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${palette.SHADES[100]};
`;

export const FileUploadLabel = styled.label`
  max-width: 150px;
  width: 100%;
  height: 187px;
  position: relative;
  display: inline-block;
  border: 1px solid ${palette.NEUTRAL[900]};
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: ${palette.NEUTRAL[100]};
  }

  input[type="file"] {
    opacity: 0;
    z-index: 4;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const ImageContainer = styled.div<{ $isMainImage: boolean }>`
  position: relative;
  max-width: 150px;
  width: 100%;
  height: 187px;
  border: 2px solid
    ${({ $isMainImage }) =>
      $isMainImage ? palette.PRIMARY.dashboard[600] : "transparent"};
  border-radius: 5px;
  cursor: pointer;

  .main_image_button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &:hover {
    border-color: ${palette.PRIMARY.dashboard[600]};
  }
`;

export const ImageS = styled.img`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

export const SaveButtonBlock = styled.div`
  max-width: 187px;
  margin: 0 auto;
  margin-top: 40px;
`;
