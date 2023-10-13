import React, { FC, useMemo, useState } from 'react'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/routes/paths'
import Autocomplete from '@/shared/ui/autocomplete'
import Button from '@/shared/ui/button'
import Checkbox from '@/shared/ui/checkbox'
import CustomSelect from '@/shared/ui/select'
import { TextArea } from '@/shared/ui/textArea'
import TextField from '@/shared/ui/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { VariantsProduct } from '../../secondStep'
import { ProductDetailsField } from '../productDetailsField'

const sellerClient = new SellerClient()

interface SpecificationInput {
  value: string
  placeholder: string
}

interface SpecificationGroup {
  inputs: SpecificationInput[]
}

interface FormValues {
  title: string
  description: string
  brand: string
  gender: string
  for_kids: boolean
  price: string
  discount: string
  category_id: string
  subcategory_id: string
  country: string
  tags: string[]
  specifications: SpecificationGroup[]
  publish_date: string
}

type GenderType = {
  id: string
  name: string
  value: string
}

type SelectedOptionType = {
  [key: string]: string
}

const gender: GenderType[] = [
  {
    id: '1',
    name: 'Мужчина',
    value: 'male',
  },
  {
    id: '2',
    name: 'Женщина',
    value: 'female',
  },
]

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    title: yup.string().required(t('Введите название продукта')),
    description: yup.string().required(t('Введите описание продукта')),
    brand: yup.string().required(t('Введите бренд продукта')),
    gender: yup.string().required(t('Выберите пол')),
    for_kids: yup.boolean(),
    price: yup
      .number()
      .typeError(t('Цена должна быть числом'))
      .positive(t('Цена должна быть больше или равна 0'))
      .required(t('Введите цену продукта')),
    discount: yup.number().min(0, t('Скидка должна быть не меньше 0')).max(100, t('Скидка должна быть не больше 100')),
    category_id: yup.string().required(t('Выберите категорию продукта')),
    subcategory_id: yup.string().required(t('Выберите подкатегорию продукта')),
    specifications: yup
      .array()
      .of(
        yup.object().shape({
          inputs: yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(t('Введите значение')),
              }),
            )
            .required(t('Добавьте хотя бы одно значение')),
        }),
      )
      .required(t('Добавьте хотя бы одну группу значений')),
    tags: yup.array(),
    publish_date: yup.string(),
  })

const mockDataVariants = [
  {
    id: Date.now(),
    product_images: [
      {
        id: Date.now(),
        main_image: true,
        image_url: '/dog.jpg',
      },
      {
        id: Date.now(),
        main_image: false,
        image_url: '/dog2.jpg',
      },
    ],
    color: 'red',
    size: [
      {
        id: Date.now() + 1,
        size: 'XL',
      },
      {
        id: Date.now() + 2,
        size: 'L',
      },
    ],
    availableCount: 543,
    price: '35 990',
    description: 'Прекрасное описание товара для варианта 1',
  },
  {
    id: Date.now() + 3,
    product_images: [
      {
        id: Date.now() + 4,
        main_image: true,
        image_url: '/child.png',
      },
      {
        id: Date.now() + 5,
        main_image: false,
        image_url: '/dog.jpg',
      },
    ],
    color: 'blue',
    size: [
      {
        id: Date.now() + 6,
        size: 'M',
      },
      {
        id: Date.now() + 7,
        size: 'S',
      },
    ],
    availableCount: 320,
    price: '29 990',
    description: 'Замечательное описание товара для варианта 2',
  },
  {
    id: Date.now() + 8,
    product_images: [
      {
        id: Date.now() + 9,
        main_image: false,
        image_url: '/child.png',
      },
      {
        id: Date.now() + 10,
        main_image: true,
        image_url: '/fish.jpeg',
      },
    ],
    color: 'green',
    size: [
      {
        id: Date.now() + 11,
        size: 'XXL',
      },
      {
        id: Date.now() + 12,
        size: 'XS',
      },
    ],
    availableCount: 120,
    price: '42 990',
    description: 'Отличное описание товара для варианта 3',
  },
]

const categoriesData = [
  {
    id: '1',
    title: 'Одежда',
    subcategories: [
      {
        id: '1-1',
        title: 'Мужская одежда',
      },
      {
        id: '1-2',
        title: 'Женская одежда',
      },
      {
        id: '1-3',
        title: 'Детская одежда',
      },
    ],
  },
  {
    id: '2',
    title: 'Обувь',
    subcategories: [
      {
        id: '2-1',
        title: 'Мужская обувь',
      },
      {
        id: '2-2',
        title: 'Женская обувь',
      },
      {
        id: '2-3',
        title: 'Детская обувь',
      },
    ],
  },
]

const countriesData = [
  {
    id: '1',
    name: 'США',
  },
  {
    id: '2',
    name: 'Китай',
  },
  {
    id: '3',
    name: 'Германия',
  },
]

const InfoAboutProduct: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const id = (router.query?.id as string) || ''
  const {
    categories,
    productDetailsChoice,
    // productDetailsMaterialChoice,
    productDetailsSizeChoice,
    product,
  } = useAppSelector((state) => state.seller)

  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>({
    product_composition: '',
    details: '',
    size_and_selections: '',
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      brand: '',
      gender: '',
      for_kids: false,
      price: '',
      discount: '',
      category_id: '',
      subcategory_id: '',
      country: '',
      tags: [],
      specifications: [
        {
          inputs: [
            { value: '', placeholder: 'Состав товара' },
            { value: '', placeholder: '40%' },
          ],
        },
      ],
      publish_date: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      console.log({ values })
      try {
        await sellerClient.createProduct(values)
        // router.push({
        // 	pathname: PATH_LK_SELLER_CREATE_PRODUCT.step2,
        // 	query: { id: data.id },
        // })
        // resetForm()
      } catch (error) {
        console.log(error)
      }
    },
  })

  const handleFieldsValueChange = (fieldName: string, value: string) => formik.setFieldValue(fieldName, value)

  const subcategories = useMemo(() => {
    return categories.find((category) => category.id === formik.values.category_id)?.subcategories || []
  }, [formik])

  const navigateToPreviewProduct = () =>
    router.push({
      pathname: PATH_LK_SELLER_CREATE_PRODUCT.previewProduct,
    })

  // useEffect(() => {
  //   id && product && setSellerCreateProductFieldsInfo();
  // }, [id, product]);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchProductDetailsChoice());
  //   dispatch(fetchProductDetailsMaterialChoice());
  //   dispatch(fetchProductDetailsSizeChoice());
  //   id && dispatch(fetchProduct(id));
  // }, []);

  return (
    <div className="px-[24px] py-[20px]">
      <div className="max-w-[528px]">
        <p className="text-[28px] font-[700] leading-[40px] text-neutral-900">Добавить новый товар</p>

        <p className="mt-10 text-[18px] font-[500] leading-[28px] text-neutral-900">Информация о продукте</p>

        <TextField
          error={formik.touched.title && Boolean(formik.errors.title)}
          errorMessage={formik.touched.title ? formik.errors.title : ''}
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder={t('Название продукта')}
          className={'mt-5'}
          name="title"
          type={'date'}
        />

        <TextField
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          errorMessage={formik.touched.brand ? formik.errors.brand : ''}
          value={formik.values.brand}
          onChange={formik.handleChange}
          placeholder={t('Название Бренда')}
          className={'mt-5'}
          name="brand"
        />

        <CustomSelect
          placeholder={t('Пол')}
          value={formik.values.gender}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          errorMessage={formik.touched.gender ? formik.errors.gender : ''}
          options={gender}
          onChange={(value) => handleFieldsValueChange('gender', value)}
          fieldTitle="name"
          fieldValue="value"
          className={'mt-5 w-[50%]'}
        />

        <Checkbox
          label={'Детская одежда'}
          checked={formik.values.for_kids}
          onChange={() => formik.setFieldValue('for_kids', !formik.values.for_kids)}
          className={'mt-5'}
        />

        <div className={'mt-5 flex w-[100%] gap-[24px]'}>
          <TextField
            value={formik.values.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            errorMessage={formik.touched.price ? formik.errors.price : ''}
            onChange={formik.handleChange}
            placeholder={t('Цена')}
            name="price"
          />

          <TextField
            value={formik.values.discount}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            errorMessage={formik.touched.discount ? formik.errors.discount : ''}
            onChange={formik.handleChange}
            placeholder={t('Скидка')}
            name="discount"
            helperText="не обязательно"
          />
        </div>

        <div className={'mt-5 flex w-[100%] gap-[24px]'}>
          <Autocomplete
            placeholder={t('Основная категория')}
            options={categoriesData}
            onChange={(value) => {
              console.log(value)
              handleFieldsValueChange('category_id', value)
              formik.setFieldValue('subcategory_id', '')
            }}
            value={formik.values.category_id}
            error={formik.touched.category_id && !!formik.errors.category_id}
            errorMessage={formik.touched.category_id ? formik.errors.category_id : ''}
            width="100%"
            fieldTitle="title"
            fieldValue="id"
          />

          <Autocomplete
            placeholder={t('Подкатегория')}
            options={categoriesData.find((category) => category.id === formik.values.category_id)?.subcategories || []}
            onChange={(value) => handleFieldsValueChange('subcategory_id', value)}
            error={formik.touched.subcategory_id && Boolean(formik.errors.subcategory_id)}
            value={formik.values.subcategory_id}
            errorMessage={formik.touched.subcategory_id ? formik.errors.subcategory_id : ''}
            width="100%"
            fieldTitle="title"
            fieldValue="id"
          />
        </div>

        <Autocomplete
          placeholder={t('Страна производителя ')}
          options={countriesData}
          onChange={(value) => handleFieldsValueChange('country', value)}
          error={formik.touched.country && Boolean(formik.errors.country)}
          value={formik.values.country}
          errorMessage={formik.touched.country ? formik.errors.country : ''}
          width="100%"
          fieldTitle="name"
          fieldValue="name"
          className={'mt-5'}
          helperText="не обязательно"
        />
        {/*font-weight: 500;*/}
        {/*font-size: 18px;*/}
        {/*line-height: 28px;*/}
        {/*color: ${palette.NEUTRAL[900]};*/}
        <p className="mt-[30px] text-[18px] font-[500] leading-[28px] text-neutral-900">Дополнительная информация</p>

        <TextArea
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          errorMessage={formik.touched.description ? formik.errors.description : ''}
          onChange={formik.handleChange}
          placeholder={t('Описание товара')}
          name="description"
          className={'mt-5'}
        />

        <ProductDetailsField formik={formik} fieldName="specifications" className={'mt-5'} />

        <TextArea
          value={formik.values.discount}
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          errorMessage={formik.touched.discount ? formik.errors.discount : ''}
          onChange={formik.handleChange}
          placeholder={t('Рекомендации по уходу')}
          name="discount"
          className={'mt-5'}
        />
      </div>
      <p className="mt-[30px] text-[18px] font-[500] leading-[28px] text-neutral-900">Варианты</p>

      <VariantsProduct data={mockDataVariants} />

      <div className="mt-[60px] flex justify-end">
        <Button
          // onClick={navigateToPreviewProduct}
          onClick={() => formik.handleSubmit()}
          type="submit"
          className={'max-w-[252px]'}
          variant="WithoutBackgroundButton"
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}

export default InfoAboutProduct
