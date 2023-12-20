import React, { useEffect, useState, ChangeEvent } from 'react'
import { TextArea } from '@/shared/ui/inputs/textArea'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/buttons'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Edit2, Image as ImageIcon, Instagram, Trash2, Upload } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerClient } from '@/shared/apis/sellerClient'
import { Skeleton } from '@/shared/ui/loaders'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { handleApiError } from '@/shared/lib/helpers'
import * as yup from 'yup'
import { TiktokIcon } from '@/shared/assets/icons/TiktokIcon'
import { TwitterIcon } from '@/shared/assets/icons/TwitterIcon'

const sellerClient = new SellerClient()

interface FormValues {
  title?: string
  description?: string
  logo?: File | string | null
  banner?: File | string | null
  tiktok_link?: string
  instagram_link?: string
  whats_app_link?: string
  advertising_slogan?: string
}

export const myShopInfoValidationSchema = (t: (key: string) => string) =>
  yup.object({
    title: yup.string().required(t('Обязательное поле')),
  })

export const AboutShopMainSection = () => {
  const { t } = useTranslation()
  const [isEdit, setIsEdit] = useState(false)
  const queryClient = useQueryClient()
  const { data: shop } = useQuery(['shop'], sellerClient.fetchShop)
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)
  const [imagePreview, setImagePreview] = useState({
    logo: {
      url: '',
      title: '',
    },
    banner: {
      url: '',
      title: '',
    },
  })

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
      logo: '',
      banner: '',
      tiktok_link: '',
      instagram_link: '',
      whats_app_link: '',
      advertising_slogan: '',
    },
    validationSchema: myShopInfoValidationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        // const sanitizedValues = omitBy(values, isNull) as FormValues

        // if (sanitizedValues.logo instanceof File && sanitizedValues.banner instanceof File) {
        //   !!shop?.slug && (await mutationEditShop.mutateAsync({ slug: shop.slug, shopData: sanitizedValues }))
        // } else {
        //   const { logo, ...shopDataWithoutLogo } = sanitizedValues //eslint-disable-line

        //   !!shop?.slug && (await mutationEditShop.mutateAsync({ slug: shop.slug, shopData: shopDataWithoutLogo }))
        // }

        if (values.logo && !(values.logo instanceof File)) {
          delete values.logo
        }
        if (values.banner && !(values.banner instanceof File)) {
          delete values.banner
        }

        !!shop?.slug && (await mutationEditShop.mutateAsync({ slug: shop.slug, shopData: values }))

        await queryClient.invalidateQueries(['shop'])

        toast.success('Данные вашего магазина изменены')
        setIsEdit(false)

        resetForm()
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
      setImagePreview((prev) => ({ ...prev, logo: { ...prev.banner, url: previewURL, title: file.name } }))
    }
  }

  const handleBannerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formik.setFieldValue('banner', file)

      const previewURL = URL.createObjectURL(file)
      setImagePreview((prev) => ({ ...prev, banner: { ...prev.banner, url: previewURL, title: file.name } }))
    }
  }

  const handleBannerRemove = async () => {
    formik.setFieldValue('banner', '')
    setImagePreview((prev) => ({ ...prev, banner: { url: '', title: '' } }))
    // if (shop?.banner) {
    //   await mutationEditShop.mutateAsync({
    //     slug: shop?.slug,
    //     shopData: { banner: null },
    //   })
    //   await queryClient.invalidateQueries(['shop'])
    // } else {
    //   formik.setFieldValue('banner', null)
    //   setImagePreview((prev) => ({ ...prev, banner: { url: '', title: '' } }))
    // }
  }

  useEffect(() => {
    formik.setValues({
      title: shop?.title || '',
      description: shop?.description || '',
      advertising_slogan: shop?.advertising_slogan || '',
      whats_app_link: shop?.whats_app_link || '',
      instagram_link: shop?.instagram_link || '',
      tiktok_link: shop?.tiktok_link || '',
      logo: shop?.logo || '',
      banner: shop?.banner || '',
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
                  src={imagePreview.logo.url || shop?.logo || '/images/mock/child.png'}
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
                    value={formik.values.title || ''}
                    onChange={formik.handleChange}
                    placeholder={t('Название магазина')}
                    label={t('Название магазина')}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    errorMessage={formik.touched.title ? formik.errors.title : ''}
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

            {isEdit ? (
              <TextArea
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                placeholder={t('Описание магазина')}
                name="description"
                className={'mt-5 max-w-[528px]'}
              />
            ) : (
              <p className="mt-4 max-w-[664px] text-base font-normal text-neutral-900">{shop?.description || '---'}</p>
            )}
          </div>

          <div className="inline-flex flex-col items-start justify-start gap-3 bg-white py-5">
            <div className="inline-flex items-center justify-start gap-4">
              <p className="text-lg font-medium text-neutral-900">Страница магазина</p>
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-5">
              <div className="flex w-full flex-col items-start justify-start gap-5">
                <div className="flex w-full gap-4">
                  <Image
                    width={118}
                    height={64}
                    src={
                      imagePreview.banner.url ||
                      (typeof formik.values.banner === 'string' && formik.values.banner) ||
                      '/images/mock/child.png'
                    }
                    alt={'website image'}
                    layout="responsive"
                    className="max-h-[64px] w-full max-w-[118px]"
                  />

                  {isEdit && (
                    <div className="inline-flex flex-col items-start justify-start gap-3">
                      <div className="flex flex-wrap items-start justify-start gap-4">
                        <Button variant={BUTTON_STYLES.withoutBackground} className="max-w-max !p-1">
                          <input
                            id="bannerInput"
                            type="file"
                            onChange={handleBannerUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                          />

                          <label htmlFor="bannerInput">
                            <div className="flex gap-1">
                              <p className="text-base font-semibold text-neutral-900">Загрузить другое лого</p>
                              <Upload />
                            </div>
                          </label>
                        </Button>

                        <Button
                          variant={BUTTON_STYLES.withoutBackground}
                          className="max-w-max !border-red !p-1 text-red"
                          onClick={handleBannerRemove}
                        >
                          <div className="flex gap-1">
                            <p className="text-base font-semibold">Удалить лого</p>

                            <Trash2 />
                          </div>
                        </Button>
                      </div>

                      <p className="text-right text-base font-normal text-stone-500">{imagePreview.banner.title}</p>
                    </div>
                  )}
                </div>

                <div className="flex w-full flex-col items-start justify-start gap-3">
                  {isEdit ? (
                    <TextField
                      value={formik.values.advertising_slogan || ''}
                      onChange={formik.handleChange}
                      placeholder={t('Рекламный лозунг')}
                      name="advertising_slogan"
                      className={'mt-5 max-w-[564px]'}
                      label={'Рекламный лозунг'}
                    />
                  ) : (
                    <p className="text-2xl font-semibold text-neutral-900">be adam – гардероб со смыслом</p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-3">
                <p className="text-lg font-medium text-neutral-900">Соцсети</p>

                <div className="flex w-full flex-col items-start justify-center gap-4">
                  <div className="inline-flex w-full items-center justify-start gap-2">
                    <Instagram size={28} />

                    {isEdit ? (
                      <TextField
                        value={formik.values.instagram_link || ''}
                        onChange={formik.handleChange}
                        placeholder={t('Instagram')}
                        name="instagram_link"
                        className={'max-w-[528px]'}
                      />
                    ) : (
                      <p className="text-base font-medium text-neutral-900">{shop?.instagram_link || '---'}</p>
                    )}
                  </div>

                  <div className="inline-flex w-full items-center justify-start gap-2">
                    <TiktokIcon />

                    {isEdit ? (
                      <TextField
                        value={formik.values.tiktok_link || ''}
                        onChange={formik.handleChange}
                        placeholder={t('Tiktok')}
                        name="tiktok_link"
                        className={'max-w-[528px]'}
                      />
                    ) : (
                      <p className="text-base font-medium text-neutral-900">{shop?.tiktok_link || '---'}</p>
                    )}
                  </div>

                  <div className="inline-flex w-full items-center justify-start gap-2">
                    <TwitterIcon />

                    {isEdit ? (
                      <TextField
                        value={formik.values.whats_app_link || ''}
                        onChange={formik.handleChange}
                        placeholder={t('WhatsApp')}
                        name="whats_app_link"
                        className={'max-w-[528px]'}
                      />
                    ) : (
                      <p className="text-base font-medium text-neutral-900">{shop?.whats_app_link || '---'}</p>
                    )}
                  </div>
                </div>
              </div>

              {!isEdit && (
                <Image
                  width={717}
                  height={369}
                  src={
                    imagePreview.banner.url ||
                    (typeof formik.values.banner === 'string' && formik.values.banner) ||
                    '/images/mock/child.png'
                  }
                  alt={'background image'}
                  layout="responsive"
                  className="max-h-[369px] max-w-[717px]"
                />
              )}
            </div>
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
