import { memo, useEffect, useMemo, useState } from "react";
import {
  AddToCartContainer,
  DescriptionOfProduct,
  DiscountPrice,
  Line,
  NameOfFieldText,
  NameOfProduct,
  NameOfThePageText,
  PastPrice,
  ProductDetailContainer,
  ProductDetailNameOfTheFields,
} from "./styles";
import ChooseColors from "@/components/ChooseColors";
import ChooseSizes from "@/components/ChooseSIzes";
import Button from "@/shared/ui/button";
import { BUTTON_STYLES } from "@/shared/lib/consts/styles";
import { Heart, ShoppingCart } from "react-feather";
import Accordion from "@/shared/ui/accordion";
import CarouselWithMainImage from "@/components/Carousels/PreviewProductImagesCarousel";
import { ButtonInfoCont } from "@/pages/auth/styles";
import {
  AddTagInput,
  DateInput,
  DatePicker,
  TimerPicker,
} from "@/feautures/create-product";
import Checkbox from "@/shared/ui/checkbox";
import { useFormik } from "formik";
import { format } from "date-fns";

const getOriginalPrice = (price: any, discount: number) =>
  Math.floor(price / (1 - discount / 100));

const NameOfFieldTextMemo = memo(({ item }: { item: any }) => (
  <NameOfFieldText key={item.id}>
    {item.value}: <span>{item.field_value}</span>
  </NameOfFieldText>
));

const ProductDetail = ({ data }: any) => {
  const [selectedPreview, setSelectedPreview] = useState<any>(data?.preview[0]);
  const isData = !data || !selectedPreview;
  const [publishByDate, setPublishByDate] = useState(false);

  const handleChangePublishByDate = () => setPublishByDate((prev) => !prev);

  const originalPrice = useMemo(
    () => getOriginalPrice(+selectedPreview?.price, data?.discount),
    [selectedPreview, data?.discount]
  );

  const [selectedHours, setSelectedHours] = useState<number>(0);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);

  const handleTimeChange = (hours: number, minutes: number) => {
    formik.setFieldValue("hours", hours);
    formik.setFieldValue("minutes", minutes);
  };

  const [tags, setTags] = useState<string[]>([]);

  const handleTagsChange = (newTags: string[]) =>
    formik.setFieldValue("tags", newTags);

  const handleDateChange = (date: string) => {
    console.log("Selected Date:", date);
    formik.setFieldValue("date", date);
    // Здесь вы можете обработать выбранный день, например, отправить его на сервер или обновить состояние вашего компонента.
  };

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
    if (selectedPreview?.id === id) return;
    setSelectedPreview(data?.preview.find((item: any) => item?.id === id));
  };

  const formik = useFormik({
    initialValues: {
      tags: [],
      date: format(new Date(), "MM-dd-yyyy"),
      hours: "",
      minutes: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (publishByDate) {
        try {
          // const datetime = `${values.date}T${values.time}`;

          // const body = {
          //   published_date: datetime,
          // };

          console.log(values);

          // await sellerClient.editProduct({ id, body });
          // router.push({
          //   pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
          //   query: { id },
          // });
        } catch (error) {
          console.log(error);
        }
      } else {
        // router.push({
        //   pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
        //   query: { id },
        // });
      }
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setSelectedPreview(data?.preview[0]);
  //   }
  // }, [data]);

  // if (isData) return null;

  return (
    <>
      <NameOfThePageText className={"mb-6"}>Preview</NameOfThePageText>
      <ProductDetailContainer>
        <CarouselWithMainImage images={selectedPreview?.product_images} />

        <div>
          <NameOfProduct>{data?.product_name}</NameOfProduct>
          <DescriptionOfProduct className={"mt-3"}>
            {data?.description}
          </DescriptionOfProduct>

          <div className={"flex items-center gap-2 mt-5"}>
            {originalPrice && <PastPrice>{originalPrice} сом</PastPrice>}
            <DiscountPrice>{selectedPreview?.price} сом</DiscountPrice>
          </div>

          <div className={"mt-8"}>
            <ChooseColors
              previews={data?.preview}
              selectedPreview={selectedPreview}
              onClick={handleSelectPreview}
            />
          </div>

          <div className={"mt-8"}>
            <ChooseSizes preview={selectedPreview} />
          </div>

          <AddToCartContainer className={"mt-12 mb-12"}>
            <Button
              variant={BUTTON_STYLES.secondaryCtaIndigo}
              disabled
              size="large"
            >
              <ButtonInfoCont>
                Добавить в корзину
                <ShoppingCart />
              </ButtonInfoCont>
            </Button>

            <Button
              variant={BUTTON_STYLES.secondaryCtaIndigo}
              size="large"
              disabled
            >
              <Heart />
            </Button>
          </AddToCartContainer>

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
      </ProductDetailContainer>

      <ProductDetailNameOfTheFields
        $fontSize={18}
        className={"mt-[64px] mb-[15px]"}
      >
        Настройки публикации
      </ProductDetailNameOfTheFields>

      <form>
        <div className={"mb-10"}>
          <ProductDetailNameOfTheFields className={"mb-3"}>
            Тэги для поиска
          </ProductDetailNameOfTheFields>

          <AddTagInput tags={formik.values.tags} onChange={handleTagsChange} />
        </div>

        <Checkbox
          label={"Опубликовать к определенной дате"}
          checked={publishByDate}
          onChange={handleChangePublishByDate}
        />

        {publishByDate && (
          <>
            <DateInput
              value={formik.values.date}
              onChange={handleDateChange}
              className={"max-w-[657px] mt-5 mb-3 w-[100%]"}
            />

            <div className={"w-[100%] flex items-start gap-10"}>
              <DatePicker
                initialDate={formik.values.date}
                onDateSelect={handleDateChange}
              />

              <div>
                <ProductDetailNameOfTheFields
                  $fontWeight={600}
                  className={"mb-3"}
                >
                  Выберите время
                </ProductDetailNameOfTheFields>
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
  );
};

export default ProductDetail;
