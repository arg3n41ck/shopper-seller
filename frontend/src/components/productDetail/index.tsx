import CarouselWithMainImage from '@/components/carousels/previewProductImagesCarousel'
import ChooseColors from '@/components/chooseColors'
import ChooseSizes from '@/components/chooseSIzes'
import { AddTagInput, DateInput, DatePicker, TimerPicker } from '@/feautures/create-product'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import Button from '@/shared/ui/button'
import Checkbox from '@/shared/ui/checkbox'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { memo, useMemo, useState } from 'react'
import { Heart, ShoppingCart } from 'react-feather'

const getOriginalPrice = (price: any, discount: number) => Math.floor(price / (1 - discount / 100))

const NameOfFieldTextMemo = memo(({ item }: { item: any }) => (
  <p className="text-[13.33px] font-[700px] leading-[16px] text-black" key={item.id}>
    {item.value}: <span className="font-[400]">{item.field_value}</span>
  </p>
))

const ProductDetail = ({ data }: any) => {
  const [selectedPreview, setSelectedPreview] = useState<any>(data?.preview[0])
  const isData = !data || !selectedPreview
  const [publishByDate, setPublishByDate] = useState(false)

  const handleChangePublishByDate = () => setPublishByDate((prev) => !prev)

  const originalPrice = useMemo(
    () => getOriginalPrice(+selectedPreview?.price, data?.discount),
    [selectedPreview, data?.discount],
  )

  const [selectedHours, setSelectedHours] = useState<number>(0)
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0)

  const handleTimeChange = (hours: number, minutes: number) => {
    formik.setFieldValue('hours', hours)
    formik.setFieldValue('minutes', minutes)
  }

  const [tags, setTags] = useState<string[]>([])

  const handleTagsChange = (newTags: string[]) => formik.setFieldValue('tags', newTags)

  const handleDateChange = (date: string) => {
    console.log('Selected Date:', date)
    formik.setFieldValue('date', date)
    // Здесь вы можете обработать выбранный день, например, отправить его на сервер или обновить состояние вашего компонента.
  }

  // const groupedDetails = useMemo(
  //   () =>
  //     data?.product_detail.reduce((acc: any, item: any) => {
  //       if (!acc[item.field_type]) {
  //         acc[item.field_type] = [];
  //       }
  //       acc[item.field_type].push(item);
  //       return acc;
  //     }, {}),
  //   [data]
  // );

  // const materialAndCare = groupedDetails?.["material_and_care"] || [];
  // const details = groupedDetails?.["details"] || [];
  // const sizeAndSelections = groupedDetails?.["size_and_selections"] || [];

  const handleSelectPreview = (id: string) => {
    if (selectedPreview?.id === id) return
    setSelectedPreview(data?.preview.find((item: any) => item?.id === id))
  }

  const formik = useFormik({
    initialValues: {
      tags: [],
      date: format(new Date(), 'MM-dd-yyyy'),
      hours: '',
      minutes: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (publishByDate) {
        try {
          // const datetime = `${values.date}T${values.time}`;

          // const body = {
          //   published_date: datetime,
          // };

          console.log(values)

          // await sellerClient.editProduct({ id, body });
          // router.push({
          //   pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
          //   query: { id },
          // });
        } catch (error) {
          console.log(error)
        }
      } else {
        // router.push({
        //   pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
        //   query: { id },
        // });
      }
    },
  })

  // useEffect(() => {
  //   if (data) {
  //     setSelectedPreview(data?.preview[0]);
  //   }
  // }, [data]);

  // if (isData) return null;

  return (
    <>
      <p className="mb-6 text-[28px] font-[600] text-neutral-900">Preview</p>

      <div className="flex gap-[40px] border-b-[1px] border-t-[1px] border-gray py-[30px]">
        <CarouselWithMainImage images={selectedPreview?.product_images} />

        <div>
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">{data?.product_name}</p>

          <p className="text-[13.33px text-neutral-400] mt-3 leading-[16px]">{data?.description}</p>

          <div className={'mt-5 flex items-center gap-2'}>
            {originalPrice && (
              <p className="text-[16px] font-[500] text-neutral-800 line-through">{originalPrice} сом</p>
            )}
            <p className="text-[24px] font-[500] text-error700">{selectedPreview?.price} сом</p>
          </div>

          <div className={'mt-8'}>
            <ChooseColors previews={data?.preview} selectedPreview={selectedPreview} onClick={handleSelectPreview} />
          </div>

          <div className={'mt-8'}>
            <ChooseSizes preview={selectedPreview} />
          </div>

          <div className={'mb-12 mt-12 flex gap-[12px]'}>
            <Button variant={BUTTON_STYLES.secondaryCtaIndigo} disabled size="large">
              <div className="flex items-center gap-[10px]">
                Добавить в корзину
                <ShoppingCart />
              </div>
            </Button>

            <Button variant={BUTTON_STYLES.secondaryCtaIndigo} size="large" disabled>
              <Heart />
            </Button>
          </div>

          {/* {!!materialAndCare?.length && (
          <>
            <Line />
            <Accordion title="Материал и уход">
              {materialAndCare.map((item: any) => (
                <NameOfFieldTextMemo item={item} />
              ))}
            </Accordion>
          </>
        )}

        {!!details?.length && (
          <>
            <Line />
            <Accordion title="Детали">
              {details.map((item: any) => (
                <NameOfFieldTextMemo item={item} />
              ))}
            </Accordion>
          </>
        )}

        {!!sizeAndSelections?.length && (
          <>
            <Line />
            <Accordion title="Size & fit">
              {sizeAndSelections.map((item: any) => (
                <NameOfFieldTextMemo item={item} />
              ))}
            </Accordion>
            <Line />
          </>
        )} */}
        </div>
      </div>
      <p className="mb-[15px] mt-[64px] text-[18px] font-[500] text-neutral-900">Настройки публикации</p>

      <form>
        <div className={'mb-10'}>
          <p className={'mb-3 text-[16px] font-[500] text-neutral-900'}>Тэги для поиска</p>

          <AddTagInput tags={formik.values.tags} onChange={handleTagsChange} />
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

        <button onClick={() => formik.handleSubmit()} type="button">
          submit
        </button>
      </form>
    </>
  )
}

export default ProductDetail
