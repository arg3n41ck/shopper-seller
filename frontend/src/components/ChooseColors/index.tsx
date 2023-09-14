import React, { FC, useState } from "react";
import { ImageBlock, ImagesContainer, NameOfColorText } from "./styles";
import Image from "next/image";

interface ChooseColorsProps {
  previews: any;
  selectedPreview: any;
  onClick: (id: string) => void;
}

const ChooseColors: FC<ChooseColorsProps> = ({
  previews,
  onClick,
  selectedPreview,
}) => {
  return (
    <div>
      <NameOfColorText>
        Цвет: <span>{selectedPreview?.color}</span>
      </NameOfColorText>

      <ImagesContainer className={"mt-3"}>
        {previews?.map((item: any) => (
          <ImageBlock key={item.id} onClick={() => onClick(item.id)}>
            <Image
              src={item.product_images[0]?.image_url}
              alt={`Image ${selectedPreview?.color}`}
              width={63}
              height={85}
            />
          </ImageBlock>
        ))}
      </ImagesContainer>
    </div>
  );
};

export default ChooseColors;
