import React, { FC } from 'react'
import { Plus, X } from 'react-feather'
import { BUTTON_STYLES, PRIMARY } from '@/shared/lib/consts/styles'
import clsx from 'classnames'
import Image from 'next/image'
import { Button } from '@/shared/ui/buttons'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'

interface AddImagesProps {
  value: TypeImageFile[]
  className?: string
  deleteImage: (index: number, id?: number) => void
  handleToggleMainImage: (index: number, id?: number, is_main?: boolean) => void
  handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AddImages: FC<AddImagesProps> = ({
  value,
  className,
  deleteImage,
  handleToggleMainImage,
  handleImagesChange,
}) => {
  return (
    <div className={clsx(className, 'w-full overflow-x-auto')}>
      <div className="flex gap-5">
        <div className="flex max-w-[490px] gap-5 overflow-x-scroll whitespace-nowrap">
          {!!value?.length &&
            value.map((item: TypeImageFile, index: number) => {
              let imageSrc: string

              if (
                typeof item.image === 'object' &&
                item.image !== null &&
                'base64' in item.image &&
                item.image.base64
              ) {
                imageSrc = item.image.base64
              } else if (item.image instanceof File || item.image instanceof Blob) {
                imageSrc = URL.createObjectURL(item.image)
              } else if (typeof item.image === 'string') {
                imageSrc = item.image
              } else {
                imageSrc = '/images/mock/child.png'
              }

              return (
                <div className="group/buttons relative w-[150px]" key={index}>
                  <div className="absolute z-[1] flex w-full items-center justify-between gap-2 px-2 pt-2">
                    <Button
                      variant={BUTTON_STYLES.primaryCtaIndigo}
                      className={`${
                        item.is_main ? 'visible' : 'invisible opacity-70'
                      } h-[25px] max-w-[100px] px-1 py-2 !text-[12px] !font-normal  group-hover/buttons:visible`}
                      onClick={() => handleToggleMainImage(index, item?.id, !item?.is_main)}
                    >
                      {item.is_main ? 'Основное фото' : 'Сделать основным'}
                    </Button>

                    <Button
                      variant={BUTTON_STYLES.primaryCtaIndigo}
                      className="invisible h-[25px] max-w-[24px] px-1 py-2 !text-[12px] !font-normal opacity-50 group-hover/buttons:visible"
                      onClick={() => deleteImage(index, item?.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>

                  <Image
                    className={`rounded-5 relative h-[187px] w-[150px] max-w-none cursor-pointer border-[2px] border-transparent object-cover ${
                      item.is_main ? '!border-primaryDash600' : ''
                    } group-hover/buttons:border-primaryDash600`}
                    src={imageSrc}
                    width={150}
                    height={187}
                    alt={`image ${index}`}
                  />
                </div>
              )
            })}
        </div>

        <div>
          <label className="relative inline-block h-[187px] w-[150px] cursor-pointer overflow-hidden border-[2px] border-primaryDash600 hover:bg-neutral-100">
            <input
              className="absolute z-[4] h-full w-full cursor-pointer opacity-0"
              id="user-logo"
              name={'image'}
              accept="image/*"
              onChange={(e) => handleImagesChange(e)}
              type="file"
              multiple
            />

            <div className="absolute left-1/2 top-1/2 z-[2] flex h-[187px] w-[150px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
              <Plus size={46} color={PRIMARY.dashboard[600]} />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}
