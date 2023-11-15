import React, { useEffect, useState, ChangeEvent } from 'react'
import { TextArea } from '@/shared/ui/inputs/textArea'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/buttons'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Edit2, Image as ImageIcon } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'
import { Skeleton } from '@/shared/ui/loaders'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { handleApiError } from '@/shared/lib/helpers'

const sellerClient = new SellerClient()

interface FormValues {
  title: string
  description: string
  logo: File | string | null
}

export const AboutShopMainSection = () => {
  const { t } = useTranslation()
  const [isEdit, setIsEdit] = useState(false)
  const queryClient = useQueryClient()
  const { data: shop } = useQuery(['shop'], sellerClient.fetchShop)
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleChangeIsEdit = () => setIsEdit((prev) => !prev)

  const mutationEditShop = useMutation(({ slug, shopData }: { slug: string; shopData: FormValues }) =>
    // eslint-disable-next-line
    // @ts-ignore
    sellerClient.updateShop({ slug, shopData }),
  )

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      logo: null,
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
        handleApiError(error)
      }
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      formik.setFieldValue('logo', file)

      const previewURL = URL.createObjectURL(file)
      setImagePreview(previewURL)
    }
  }
  useEffect(() => {
    formik.setValues({
      title: shop?.title || '',
      description: shop?.description || '',
      logo: shop?.logo || null,
    })
  }, [shop])

  return (
    <>
      <div className="relative h-full bg-none">
        <div className="mb-[35px] flex flex-col gap-[30px]">
          <p className="text-[28px] font-[600] text-neutral-900">Мой магазин</p>

          <div>
            <div className="flex items-start gap-[25px]">
              <div className=" relative h-[95px] w-[95px] cursor-pointer">
                <Image
                  src={imagePreview || shop?.logo || '/images/mock/child.png'}
                  alt={shop?.title || 'logo icon'}
                  className="h-full rounded-[50%]"
                  width={95}
                  height={95}
                  objectFit="cover"
                  layout=""
                />

                {isEdit && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <label
                      className="flex h-full w-full cursor-pointer items-center justify-center text-primaryDash600"
                      htmlFor="logoInput"
                    >
                      <ImageIcon size={30} />
                    </label>
                    <input className="hidden" id="logoInput" type="file" onChange={handleFileChange} accept="image/*" />
                  </div>
                )}
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
            disabled={!isEdit}
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
