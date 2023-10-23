import React, { FC } from 'react'
import Image from 'next/image'
interface ChooseColorsProps {
  previews: any
  selectedPreview: any
  onClick: (id: string) => void
}

const ChooseColors: FC<ChooseColorsProps> = ({ previews, onClick, selectedPreview }) => {
  return (
    <div>
      <p className="text-[16px] text-gray">
        Цвет: <span className="text-black">{selectedPreview?.color}</span>
      </p>

      <div className={'mt-3 flex gap-[16px]'}>
        {previews?.map((item: any) => (
          <div className="h-[85px] w-[63px]" key={item.id} onClick={() => onClick(item.id)}>
            <Image
              className="h-full w-full cursor-pointer"
              src={item.product_images[0]?.image_url}
              alt={`Image ${selectedPreview?.color}`}
              width={63}
              height={85}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChooseColors
