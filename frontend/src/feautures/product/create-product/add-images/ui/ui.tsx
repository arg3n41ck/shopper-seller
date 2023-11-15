import React, { FC } from 'react'
import { Plus, X } from 'react-feather'
import { BUTTON_STYLES, PRIMARY } from '@/shared/lib/consts/styles'
import clsx from 'classnames'
import Image from 'next/image'
import { Button } from '@/shared/ui/buttons'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'

interface AddImagesProps {
  value: TypeImageFile[]
  fieldTitle: string
  className?: string
  onChange: (name: string, value: TypeImageFile[] | string | boolean) => void
  deleteImage: (index: number) => void
}

export const AddImages: FC<AddImagesProps> = ({ value, fieldTitle, className, onChange, deleteImage }) => {
  const handleToggleMainImage = (index: number) => {
    const updatedValue = value.map((item, i) => {
      return {
        ...item,
        main_image: i === index && !item.main_image,
      }
    })

    onChange(fieldTitle, updatedValue)
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files && files?.length) {
      const images = Array.from(files).map((file) => ({
        image: file,
        main_image: false,
      }))

      // eslint-disable-next-line
      // @ts-ignore
      onChange(fieldTitle, [...value, ...images])
    }
  }

  return (
    <div className={clsx(className, 'w-full overflow-x-auto')}>
      <div className="flex gap-5">
        <div className="flex max-w-[490px] gap-5 overflow-x-scroll whitespace-nowrap">
          {!!value?.length &&
            value.map((item: TypeImageFile, index: number) => {
              const image = typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image)

              return (
                <div className="group/buttons relative w-[150px]" key={index}>
                  <div className="absolute z-[1] flex w-full items-center justify-between gap-2 px-2 pt-2">
                    <Button
                      variant={BUTTON_STYLES.primaryCtaIndigo}
                      className={`${
                        item.main_image ? 'visible' : 'invisible opacity-70'
                      } h-[25px] max-w-[100px] px-1 py-2 !text-[12px] !font-normal  group-hover/buttons:visible`}
                      onClick={() => handleToggleMainImage(index)}
                    >
                      {item.main_image ? 'Основное фото' : 'Сделать основным'}
                    </Button>

                    <Button
                      variant={BUTTON_STYLES.primaryCtaIndigo}
                      className="invisible h-[25px] max-w-[24px] px-1 py-2 !text-[12px] !font-normal opacity-50 group-hover/buttons:visible"
                      onClick={() => deleteImage(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>

                  <Image
                    className={`rounded-5 relative h-[187px] w-[150px] cursor-pointer border-[2px] border-transparent object-cover ${
                      item.main_image ? '!border-primaryDash600' : ''
                    } group-hover/buttons:border-primaryDash600`}
                    src={image}
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
