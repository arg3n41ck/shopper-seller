import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from '@/shared/ui/buttons'
import React, { FC } from 'react'
import Backdrop from 'src/shared/ui/templates/backdrop'

interface Props {
  open: boolean
  onClose: () => void
  deleteVariant: () => void
}

const DeleteVariantBackdrop: FC<Props> = ({ open, onClose, deleteVariant }) => {
  const deleteFunc = async () => {
    await deleteVariant()
    onClose()
  }

  return (
    <Backdrop open={open} onClose={onClose}>
      <div
        className={`
			absolute left-[50%] top-[50%] flex w-full max-w-[516px] 
			translate-x-[-50%] translate-y-[-50%] flex-col gap-5 bg-white
			p-10
			`}
      >
        <p className="text-center text-2xl font-medium text-[#000]">Удалить вариант?</p>

        <p className="text-center text-base font-normal text-neutral-900">Вы уверены, что хотите удалить вариант?</p>

        <div className="flex items-center justify-between gap-5">
          <Button variant={BUTTON_STYLES.withoutBackground} onClick={onClose}>
            Отмена
          </Button>

          <Button variant={BUTTON_STYLES.errorWithBackground} onClick={deleteFunc}>
            Удалить
          </Button>
        </div>
      </div>
    </Backdrop>
  )
}

export default DeleteVariantBackdrop
