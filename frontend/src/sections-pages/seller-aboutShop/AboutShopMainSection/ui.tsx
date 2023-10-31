import React, { useState } from 'react'
import { TextArea } from '@/shared/ui/inputs/textArea'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/buttons'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Edit2 } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'

export const AboutShopMainSection = () => {
  const { t } = useTranslation()
  const [isEdit, setIsEdit] = useState(false)

  const handleChangeIsEdit = () => setIsEdit((prev) => !prev)

  // useEffect(() => {
  //   dispatch(fetchSeller((query?.slug as string) || ''))
  // }, [query])

  return (
    <>
      <div className="relative h-full bg-none">
        <div className="mb-[35px] flex flex-col gap-[30px]">
          <p className="text-[28px] font-[600] text-neutral-900">Мой магазин</p>

          <div>
            <div className="flex items-start gap-[25px]">
              <div className="h-[95px] w-[95px] cursor-pointer">
                {/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
                <Image
                  src={'/dog.jpg'}
                  alt="dog"
                  className="h-full rounded-[50%]"
                  width={95}
                  height={95}
                  objectFit="cover"
                  layout=""
                />
              </div>

              <div className="flex max-w-[250px] flex-col gap-[12px]">
                {/* {!user ? (
									<Skeleton height='38px' />
								) : (
									<ShopNameText>{user?.seller?.shop_name}</ShopNameText>
								)}
								{!user ? (
									<Skeleton height='19px' />
								) : (
									<ShopEmailText>{user?.email}</ShopEmailText>
								)} */}

                {isEdit ? (
                  <TextField
                    value={''}
                    // error={
                    // 	formik.touched.description &&
                    // 	Boolean(formik.errors.description)
                    // }
                    // errorMessage={
                    // 	formik.touched.description ? formik.errors.description : ''
                    // }
                    onChange={() => {}}
                    placeholder={t('Название магазина')}
                    label={t('Название магазина')}
                    name=""
                    className={'max-w-[400px]'}
                  />
                ) : (
                  <p className="text-[28px] font-[600] text-neutral-900">ARGOPSHOPPER</p>
                )}

                <p className="text-[16px] font-[400] text-neutral-400">argenshopper@gmail.com</p>
              </div>
              {!isEdit && (
                <Button
                  className="max-w-max"
                  variant={BUTTON_STYLES.withoutBackground}
                  size="small"
                  onClick={handleChangeIsEdit}
                >
                  <div className="flex items-center gap-1">
                    Редактировать
                    <Edit2 />
                  </div>
                </Button>
              )}
            </div>
          </div>

          <div className="mt-[60px]">
            <p className="text-[18px] font-[500] text-neutral-900">Информация о магазине</p>

            {isEdit ? (
              <TextArea
                value={''}
                // error={
                // 	formik.touched.description &&
                // 	Boolean(formik.errors.description)
                // }
                // errorMessage={
                // 	formik.touched.description ? formik.errors.description : ''
                // }
                onChange={() => {}}
                placeholder={t('Описание магазина')}
                name=""
                className={'mt-5 max-w-[528px]'}
              />
            ) : (
              <p className="mt-4 w-[664px] text-base font-normal text-neutral-900">
                Черный/белый, шелк, сатиновый финиш, узор в диагональную полоску, завышенная талия, потайная застежка на
                молнии сбоку, прямой подол и длина миди.
              </p>
            )}
          </div>

          <Button variant={BUTTON_STYLES.primaryCta} onClick={handleChangeIsEdit} className="mt-[35px] max-w-[182px]">
            Сохранить
          </Button>
        </div>
      </div>
    </>
  )
}
