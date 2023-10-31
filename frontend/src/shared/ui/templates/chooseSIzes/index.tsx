import React, { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import { TypeVariant } from '@/shared/lib/types/sellerTypes'

interface ChooseSizesProps {
  variant: TypeVariant
}

type Size = { id?: number; size: string }

const ChooseSizes: FC<ChooseSizesProps> = ({ variant }) => {
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])

  const handleSizeClick = useCallback(
    (size: Size) => {
      setSelectedSizes((prevSelectedSizes) => {
        if (prevSelectedSizes.find((selectedSize) => selectedSize.id === size.id)) {
          return prevSelectedSizes.filter((selectedSize) => selectedSize.id !== size.id)
        }

        return [...prevSelectedSizes, size]
      })
    },
    [setSelectedSizes],
  )

  return (
    <div>
      <p className="text-[16px] text-gray">
        Цвет: <span className="text-black">{variant?.title}</span>
      </p>

      <div className="mt-3 flex gap-[16px]">
        {variant?.size_variants.map((item: Size) => (
          <div
            key={item.id}
            className={cn(
              `
			flex cursor-pointer items-center justify-center border-[1px] 
			border-neutral-400 px-[12.5px] py-[8px] text-neutral-500
			transition-all hover:bg-neutral-200 hover:text-neutral-900`,
              {
                ['rounded-[6px] !border-neutral-900 bg-none !text-neutral-900']: selectedSizes.find(
                  (selectedSize) => selectedSize.id === item.id,
                ),
              },
            )}
            onClick={() => handleSizeClick(item)}
          >
            <p className="text-[16px] leading-[19px]">{item.size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChooseSizes
