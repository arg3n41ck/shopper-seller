import React, { useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import { Edit2, Lock, Mail, Phone } from 'react-feather'
import { EditPhoneNumberModal } from './modals/editPhoneNumberModal'
import { EditEmailModal } from './modals/editEmailModal'
import { EditPasswordModal } from './modals/editPasswordModal'

export const SettingsMainSection = () => {
  // const { user } = useAppSelector((state) => state.user)
  const [showModal, setShowModal] = useState({
    phone_number: false,
    email: false,
    password: false,
  })

  const handleOpenAndCloseModal = (show: keyof typeof showModal) => {
    setShowModal((prev) => ({ ...prev, [show]: !prev[show] }))
  }

  return (
    <>
      <div className="relative h-full">
        <div className="p-[24px]">
          <p className="text-[28px] font-[600] text-neutral-900">Настройки</p>
          <div className="mb-[49px] mt-5 flex flex-col gap-[6px]">
            <p className="text-[24px] font-[500] text-black">Имя</p>
            <p className="text-[18px] leading-normal text-black">Акылбек Заманов</p>
          </div>
          <div className="grid grid-cols-1 gap-[60px]">
            <div className="w-full border-[1px] border-neutral-400" />
            <div className="flex w-[90%] items-center justify-between">
              <div className="flex items-center gap-[52px]">
                <Phone size={54} />

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-[600] leading-[19px] text-black">Номер телефона</p>
                  +996755892659
                  {/* {!user?.email ? (
										<Skeleton />
									) : (
										<FieldInfoText>{user?.email}</FieldInfoText>
									)} */}
                </div>
              </div>
              <Button variant={BUTTON_STYLES.withoutBackground} size="small" className={'max-w-[164px]'}>
                <div className="flex items-center gap-[10px]" onClick={() => handleOpenAndCloseModal('phone_number')}>
                  Изменить
                  <Edit2 size={24} />
                </div>
              </Button>
            </div>

            <div className="w-full border-[1px] border-neutral-400" />
            <div className="flex w-[90%] items-center justify-between">
              <div className="flex items-center gap-[52px]">
                <Mail size={54} />
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-[600] leading-[19px] text-black">Эл. Почта</p>
                  nikekg@info.kg
                  {/* {!user?.email ? (
										<Skeleton />
									) : (
										<FieldInfoText>{user?.email}</FieldInfoText>
									)} */}
                </div>
              </div>
              <Button variant={BUTTON_STYLES.withoutBackground} size="small" className={'max-w-[164px]'}>
                <div className="flex items-center gap-[10px]" onClick={() => handleOpenAndCloseModal('email')}>
                  Изменить
                  <Edit2 size={24} />
                </div>
              </Button>
            </div>

            <div className="w-full border-[1px] border-neutral-400" />

            <div className="flex w-[90%] items-center justify-between">
              <div className="flex items-center gap-[52px]">
                <Lock size={54} />
                <div className="gap-[8px]Z flex flex-col">
                  <p className="text-[16px] font-[600] leading-[19px] text-black">Пароль</p>
                  <p className="text-[16px] leading-[19px] text-black">**********</p>
                </div>
              </div>
              <Button variant={BUTTON_STYLES.withoutBackground} size="small" className={'max-w-[164px]'}>
                <div className="flex items-center gap-[10px]" onClick={() => handleOpenAndCloseModal('password')}>
                  Изменить
                  <Edit2 size={24} />
                </div>
              </Button>
            </div>
            <div className="w-full border-[1px] border-neutral-400" />
          </div>
        </div>
      </div>

      {/* //? Modals */}

      {showModal.phone_number && (
        <EditPhoneNumberModal open={showModal.phone_number} onClose={() => handleOpenAndCloseModal('phone_number')} />
      )}

      {showModal.email && <EditEmailModal open={showModal.email} onClose={() => handleOpenAndCloseModal('email')} />}

      {showModal.password && (
        <EditPasswordModal open={showModal.password} onClose={() => handleOpenAndCloseModal('password')} />
      )}
    </>
  )
}
