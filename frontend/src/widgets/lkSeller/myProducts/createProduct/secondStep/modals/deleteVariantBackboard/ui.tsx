import React, { FC } from 'react'
import Backdrop from '@/components/backdrop'

interface Props {
  open: boolean
  onClose: () => void
  deleteVariant: () => void
}

const DeleteVariantBackdrop: FC<Props> = ({ open, onClose, deleteVariant }) => {
  return (
    <Backdrop open={open} onClose={onClose}>
      <div
        className={`
			absolute left-[50%] top-[50%] flex w-full max-w-[322px] 
			translate-x-[-50%] translate-y-[-50%] flex-col gap-[16px] rounded-[6px] bg-white px-[16px]
			py-[12px]
			`}
      >
        <p className="text-[18px] leading-[22px] text-black">Вы действительно хотите удалить?</p>

        <div className="flex justify-end gap-[16px] text-[16px] leading-[19px] text-neutral-900">
          <button className="p-[4px]" onClick={onClose}>
            Отмена
          </button>
          <button className="font-[600] text-error500" onClick={deleteVariant}>
            Удалить
          </button>
        </div>
      </div>
    </Backdrop>
  )
}

export default DeleteVariantBackdrop
