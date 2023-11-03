import React, { useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import { EditPhoneNumberModal } from './modals/editPhoneNumberModal'
import { EditEmailModal } from './modals/editEmailModal'
import { EditPasswordModal } from './modals/editPasswordModal'
import { useQuery } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'
import { EditUserInfoModal } from './modals/editUserInfoModal'

const sellerClient = new SellerClient()

export const SettingsMainSection = () => {
  const [showModal, setShowModal] = useState({
    name: false,
    phone_number: false,
    email: false,
    password: false,
  })
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)

  const handleOpenAndCloseModal = (show: keyof typeof showModal) => {
    setShowModal((prev) => ({ ...prev, [show]: !prev[show] }))
  }

  return (
    <>
      <div className="relative h-full">
        <p className="text-[28px] font-[600] text-neutral-900">Настройки</p>
        <div className="grid grid-cols-1 gap-[20px]">
          <div className="mt-10 flex w-[90%] items-start justify-between pl-5">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[16px] font-[600] leading-[19px] text-black">Имя</p>
              {!user?.first_name && !user?.last_name ? '---' : `${user?.first_name} ${user?.last_name}`}
            </div>
            <Button
              variant={BUTTON_STYLES.onlyText}
              size="small"
              className={'max-w-[164px]'}
              onClick={() => handleOpenAndCloseModal('name')}
            >
              Изменить
            </Button>
          </div>

          <div className="w-full border-[1px] border-[#DBDBDB]" />

          <div className="flex w-[90%] items-start justify-between pl-5">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[16px] font-[600] leading-[19px] text-black">Номер телефона</p>
              {!user?.phone_number ? '---' : user.phone_number}
            </div>
            <Button
              variant={BUTTON_STYLES.onlyText}
              size="small"
              className={'max-w-[164px]'}
              onClick={() => handleOpenAndCloseModal('phone_number')}
            >
              Изменить
            </Button>
          </div>

          <div className="w-full border-[1px] border-[#DBDBDB]" />
          <div className="flex w-[90%] items-start justify-between pl-5">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[16px] font-[600] leading-[19px] text-black">Эл. Почта</p>
              {!user?.email ? '---' : user.email}
            </div>
            <Button
              variant={BUTTON_STYLES.onlyText}
              size="small"
              className={'max-w-[164px]'}
              onClick={() => handleOpenAndCloseModal('email')}
            >
              Изменить
            </Button>
          </div>

          <div className="w-full border-[1px] border-[#DBDBDB]" />

          <div className="flex w-[90%] items-start justify-between pl-5">
            <div className="flex flex-col gap-[12px]">
              <p className="text-[16px] font-[600] leading-[19px] text-black">Пароль</p>
              <p className="text-[16px] leading-[19px] text-black">**********</p>
            </div>
            <Button
              variant={BUTTON_STYLES.onlyText}
              size="small"
              className={'max-w-[164px]'}
              onClick={() => handleOpenAndCloseModal('password')}
            >
              Изменить
            </Button>
          </div>
          <div className="w-full border-[1px] border-[#DBDBDB]" />
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

      {showModal.name && <EditUserInfoModal open={showModal.name} onClose={() => handleOpenAndCloseModal('name')} />}
    </>
  )
}
