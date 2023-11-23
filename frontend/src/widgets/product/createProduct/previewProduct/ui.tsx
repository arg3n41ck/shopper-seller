import { AddTagInput, DateInput, DatePicker, TimerPicker } from '@/feautures/product/create-product'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { FC, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Heart, ShoppingBag } from 'react-feather'
import { useRouter } from 'next/router'
import { CarouselWithMainImage } from '@/shared/ui/carousels'
import { Button } from '@/shared/ui/buttons'
import Checkbox from '@/shared/ui/inputs/checkbox'
import ChooseColors from '@/shared/ui/templates/chooseColors'
import CustomSelect from '@/shared/ui/selects/default'
import { Accordion } from '@/shared/ui/accordions'
import { TypeProduct, TypeVariant } from '@/shared/lib/types/sellerTypes'
import { handleApiError } from '@/shared/lib/helpers'
import { SellerClient } from '@/shared/apis/sellerClient'
import { PATH_LK_SELLER } from '@/shared/config'
import { convertStringTagsToIds } from '@/shared/lib/helpers/convertStringTagsToIds'
import { useQueryClient } from '@tanstack/react-query'

interface PreviewProductProps {
  product: TypeProduct | undefined
}

const getOriginalPrice = (price: number, discount: number) => Math.floor(price / (1 - discount / 100))

const sellerClient = new SellerClient()

export const PreviewProductPage: FC<PreviewProductProps> = ({ product }) => {
  const router = useRouter()
  const slug = (router.query?.id as string) || ''
  const [selectedVariant, setSelectedVariant] = useState<TypeVariant | null>(null)
  const isProduct = !product
  const [publishByDate, setPublishByDate] = useState(false)
  const [publishOrDraft, setPublishOrDraft] = useState('DRAFT')
  const [chooseSize, setChooseSize] = useState('')
  const queryClient = useQueryClient()
  const handleChooseSize = (value: string) => setChooseSize(value)

  const handleChangePublishByDate = () => setPublishByDate((prev) => !prev)

  const handleNavigateToPrevPage = () => router.back()

  const originalPrice = useMemo(() => {
    if (product && product.price_from !== undefined && product.discount !== null && product.discount !== undefined) {
      return getOriginalPrice(+product.price_from, +product.discount)
    }
    return 0
  }, [selectedVariant, product?.discount])

  const handleTimeChange = (hours: number, minutes: number) => {
    formik.setFieldValue('hours', hours)
    formik.setFieldValue('minutes', minutes)
  }

  const handleTagsChange = (newTags: string[]) => formik.setFieldValue('tags', newTags)

  const handleDateChange = (date: string) => {
    formik.setFieldValue('date', date)
  }

  const handleSelectVariant = (slug: string) => {
    if (!product) return
    setSelectedVariant(() => {
      const selected = product.variants.find((item: TypeVariant) => item?.slug === slug)
      return selected !== undefined ? selected : null
    })
  }

  const formik = useFormik({
    initialValues: {
      tags: [],
      date: format(new Date(), 'MM-dd-yyyy'),
      hours: '',
      minutes: '',
    },
    onSubmit: async (values) => {
      try {
        const dateTime = `${values.date}T${values.hours}:${values.minutes}`

        const stringTags = values.tags.filter((tag) => typeof tag === 'string')

        const createdTagIds = await convertStringTagsToIds(stringTags)

        const updatedTags = values.tags.map((tag) => (typeof tag === 'string' ? createdTagIds.shift() : tag))

        const body = {
          published_date: dateTime,
          tags: updatedTags,
          status: publishOrDraft,
        }

        // eslint-disable-next-line
        // @ts-ignore
        await sellerClient.editProduct(slug, body)
        await queryClient.invalidateQueries(['tags'])
        await queryClient.invalidateQueries(['products'])

        router.push({
          pathname: PATH_LK_SELLER.productsList,
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        handleApiError(error)
      }
    },
  })

  useEffect(() => {
    if (product && product?.variants?.length) {
      setSelectedVariant(product?.variants[0])
    }
  }, [product])

  useEffect(() => {
    setChooseSize('')
  }, [selectedVariant])

  if (isProduct) return null

  return (
    <>
      <p className="mb-6 text-[28px] font-[600] text-neutral-900">Preview</p>
      <div className="flex w-full justify-between gap-[30px] border-b-[1px] border-t-[1px] border-gray py-[30px]">
        {!!selectedVariant?.images && <CarouselWithMainImage images={selectedVariant?.images} />}

        <div className="w-full max-w-[435px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">{product?.title}</p>

          <p className="text-[13.33px text-neutral-400] mt-3 leading-[16px]">{product?.description}</p>

          <div className={'mt-5 flex items-center gap-2'}>
            {originalPrice && (
              <p className="text-[16px] font-[500] text-neutral-800 line-through">{originalPrice} сом</p>
            )}
            <p className="text-[24px] font-[500] text-error700">{Math.floor(+product?.price_from)} сом</p>
          </div>

          {!!selectedVariant && (
            <div className={'mt-8'}>
              <ChooseColors
                variants={product?.variants}
                selectedVariant={selectedVariant}
                onClick={handleSelectVariant}
              />
            </div>
          )}

          <div className={'mb-5 mt-5 flex flex-col gap-[12px]'}>
            {!!selectedVariant?.size_variants && (
              <>
                <p className={'text-right text-[16px] font-[500] text-neutral-900'}>Таблица размеров</p>
                <CustomSelect
                  placeholder={'Выберите размер'}
                  value={chooseSize}
                  options={selectedVariant?.size_variants}
                  onChange={handleChooseSize}
                  fieldTitle="size"
                  fieldValue="size"
                />
              </>
            )}

            <Button variant={BUTTON_STYLES.primaryCta}>
              <div className="flex items-center gap-[10px]">
                <ShoppingBag />В корзину
              </div>
            </Button>

            <Button variant={BUTTON_STYLES.withoutBackground}>
              <div className="flex items-center gap-[10px]">
                <Heart />В Избранное
              </div>
            </Button>
          </div>

          <div className="w-full bg-neutral-100 p-3">
            <div className="flex items-center justify-between">
              <p className="text-[32px] font-semibold text-neutral-900">LUXOR</p>

              <p className="text-base font-medium text-neutral-900">В магазин</p>
            </div>

            <p className="text-base font-normal text-neutral-900">Luxor Store</p>
          </div>

          <div className="mt-5">
            <Accordion
              className="w-full border-b border-secondWhite p-3"
              title={<p className="text-base font-medium uppercase text-neutral-900">Описание</p>}
            >
              s
            </Accordion>
            <Accordion
              className="w-full border-b border-secondWhite p-3"
              title={<p className="text-base font-medium uppercase text-neutral-900">Размер и крой</p>}
            >
              s
            </Accordion>
            <Accordion
              className="w-full border-b border-secondWhite p-3"
              title={<p className="text-base font-medium uppercase text-neutral-900">Доставка и возврат</p>}
            >
              s
            </Accordion>
            <Accordion
              className="w-full border-b border-secondWhite p-3"
              title={<p className="text-base font-medium uppercase text-neutral-900">Отзывы (47)</p>}
            >
              s
            </Accordion>
          </div>
        </div>
      </div>

      <p className="mb-[15px] mt-[64px] text-[18px] font-[500] text-neutral-900">Настройки публикации</p>

      <form>
        <div className={'mb-10'}>
          <p className={'mb-3 text-[16px] font-[500] text-neutral-900'}>Тэги для поиска</p>

          <AddTagInput tags={formik.values.tags} onChange={handleTagsChange} className="max-w-[490px]" />
        </div>

        <Checkbox
          label={'Опубликовать к определенной дате'}
          checked={publishByDate}
          onChange={handleChangePublishByDate}
        />

        {publishByDate && (
          <>
            <DateInput
              value={formik.values.date}
              handleChange={handleDateChange}
              className={'mb-3 mt-5 w-[100%] max-w-[657px]'}
            />

            <div className={'flex w-[100%] items-start gap-10'}>
              <DatePicker initialDate={formik.values.date} onDateSelect={handleDateChange} />

              <div>
                <p className="mb-3 text-[16px] font-[600] text-neutral-900">Выберите время</p>

                <TimerPicker onTimeChange={handleTimeChange} />
              </div>
            </div>
          </>
        )}
      </form>

      <div className="mt-[170px]">
        <div className="border-[1px] border-neutral-300" />

        <div className="flex h-[150px] w-full items-center justify-between">
          <Button onClick={handleNavigateToPrevPage} variant={BUTTON_STYLES.onlyText} className={'max-w-[50px]'}>
            <div className={'flex items-center gap-2 '}>
              <ArrowLeft /> Назад
            </div>
          </Button>

          <div className="flex gap-[32px]">
            <Button
              onClick={() => {
                setPublishOrDraft('DRAFT')
                formik.handleSubmit()
              }}
              variant={BUTTON_STYLES.withoutBackground}
              size="large"
            >
              <div className={'flex items-center gap-2 '}>Сохранить как черновик</div>
            </Button>

            <Button
              onClick={() => {
                setPublishOrDraft('ACTIVE')
                formik.handleSubmit()
              }}
              variant={BUTTON_STYLES.primaryCta}
              size="large"
            >
              Опубликовать
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
