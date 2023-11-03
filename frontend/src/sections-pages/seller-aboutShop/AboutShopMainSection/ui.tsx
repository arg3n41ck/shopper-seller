import React, { useEffect, useState } from 'react'
import { TextArea } from '@/shared/ui/inputs/textArea'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/buttons'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Edit2 } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'
import { Skeleton } from '@/shared/ui/loaders'
import { useFormik } from 'formik'
import { ShopUpdate } from '@/shared/api/gen'
import { toast } from 'react-toastify'

const sellerClient = new SellerClient()

interface FormValues {
  title: string
  description: string
}

export const AboutShopMainSection = () => {
  const { t } = useTranslation()
  const [isEdit, setIsEdit] = useState(false)
  const queryClient = useQueryClient()
  const { data: shop } = useQuery(['shop'], sellerClient.fetchShop)
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)
  const handleChangeIsEdit = () => setIsEdit((prev) => !prev)

  const mutationEditShop = useMutation(({ slug, shopData }: { slug: string; shopData: ShopUpdate }) =>
    sellerClient.updateShop({ slug, shopData }),
  )

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        !!shop?.slug && (await mutationEditShop.mutateAsync({ slug: shop.slug, shopData: values }))

        await queryClient.invalidateQueries(['shop'])

        toast.success('Данные вашего магазина изменены')
        setIsEdit(false)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        const keysName = Object.keys(error.response.data)
        toast.error(error.response.data[keysName[0]][0])
      }
    },
  })

  useEffect(() => {
    formik.setValues({
      title: shop?.title || '',
      description: shop?.description || '',
    })
  }, [shop])

  return (
    <>
      <div className="relative h-full bg-none">
        <div className="mb-[35px] flex flex-col gap-[30px]">
          <p className="text-[28px] font-[600] text-neutral-900">Мой магазин</p>

          <div>
            <div className="flex items-start gap-[25px]">
              <div className="h-[95px] w-[95px] cursor-pointer">
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
                {isEdit ? (
                  <TextField
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder={t('Название магазина')}
                    label={t('Название магазина')}
                    name="title"
                    className={'max-w-[400px]'}
                  />
                ) : !shop?.title ? (
                  <Skeleton className="h-[24px]" />
                ) : (
                  <p className="text-[28px] font-[600] text-neutral-900">{shop.title}</p>
                )}

                {!user?.email ? (
                  <Skeleton className="h-[24px]" />
                ) : (
                  <p className="text-[16px] font-[400] text-neutral-400">{user?.email}</p>
                )}
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

            {isEdit || !shop?.description ? (
              <TextArea
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder={t('Описание магазина')}
                name="description"
                className={'mt-5 max-w-[528px]'}
              />
            ) : (
              <p className="mt-4 max-w-[664px] text-base font-normal text-neutral-900">{shop.description}</p>
            )}
          </div>

          <Button
            variant={BUTTON_STYLES.primaryCta}
            onClick={() => formik.handleSubmit()}
            className="mt-[35px] max-w-[182px]"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </>
  )
}
