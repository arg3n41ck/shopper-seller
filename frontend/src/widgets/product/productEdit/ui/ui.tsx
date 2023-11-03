import React, { useEffect, useMemo, FC, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { AddTagInput } from '@/feautures/product/create-product'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Check } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'
import CustomSelect from '@/shared/ui/selects/default'
import Checkbox from '@/shared/ui/inputs/checkbox'
import Autocomplete from '@/shared/ui/inputs/autocomplete'
import { TextArea } from '@/shared/ui/inputs/textArea'
import { ProductDetailsField } from '../../createProduct'
import { Button } from '@/shared/ui/buttons'
import { $apiProductsApi } from '@/shared/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { TypeProduct } from '@/shared/lib/types/sellerTypes'
import { Product, ProductCreate } from '@/shared/api/gen'
import { toast } from 'react-toastify'

const sellerClient = new SellerClient()

const editProduct = async (productId: string, updatedData: ProductCreate) => {
  const response = await $apiProductsApi.productsSellerProductsPartialUpdate(productId, updatedData)
  return response.data
}

interface ProductEditPageProps {
  product: Product
}

type GenderType = {
  id: string
  name: string
  value: string
}

const gender: GenderType[] = [
  {
    id: '1',
    name: 'Мужчина',
    value: 'MALE',
  },
  {
    id: '2',
    name: 'Женщина',
    value: 'FEMALE',
  },
  {
    id: '3',
    name: 'Унисекс',
    value: 'UNISEX',
  },
]

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    title: yup.string().required(t('Введите название продукта')),
    description: yup.string().required(t('Введите описание продукта')),
    gender: yup.string().required(t('Выберите пол')),
    for_kids: yup.boolean(),
    price_from: yup
      .number()
      .typeError(t('Цена должна быть числом'))
      .positive(t('Цена должна быть больше или равна 0'))
      .required(t('Введите цену продукта')),
    discount: yup.number().min(0, t('Скидка должна быть не меньше 0')).max(100, t('Скидка должна быть не больше 100')),
    // parent_category: yup.string().required(t('Выберите категорию продукта')),
    // category: yup.string().required(t('Выберите подкатегорию продукта')),
    recommendation: yup.string().required(t('Введите рекомендации по уходу')),
    tags: yup.array(),
    publish_date: yup.string(),
  })

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

export const ProductEditPage: FC<ProductEditPageProps> = ({ product }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const initialValuesRef = useRef(null)
  const mutationEditProduct = useMutation(({ id, values }: { id: string; values: ProductCreate }) =>
    editProduct(id, values),
  )
  const { data: categories } = useQuery(['categories'], sellerClient.fetchCategories)

  const formik = useFormik<TypeProduct>({
    initialValues: {
      title: '',
      description: '',
      gender: '',
      for_kids: false,
      price_from: '',
      discount: '',
      parent_category: '',
      category: '',
      country: '',
      tags: [],
      recommendation: '',
      specifications: [
        { title: '', value: '' },
        { title: '', value: '' },
      ],
      publish_date: '',
      sku: '',
      variants: [],
    },

    innerRef: initialValuesRef,
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        // eslint-disable-next-line
        const { parent_category, variants, publish_date, sku, ...restValues } = values

        // eslint-disable-next-line
        //@ts-ignore
        await mutationEditProduct.mutateAsync({ id, values: restValues })

        // router.push({
        // 	pathname: PATH_LK_SELLER_CREATE_PRODUCT.step2,
        // 	query: { id: data.id },
        // })
        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        const keysName = Object.keys(error.response.data)
        toast.error(error.response.data[keysName[0]][0])
      }
    },
  })

  const subcategories = useMemo(() => {
    // eslint-disable-next-line
    //@ts-ignore
    return categories?.find((category) => category.id === formik.values.parent_category)?.children || []
  }, [formik])

  const handleFieldsValueChange = (fieldName: string, value: string) => formik.setFieldValue(fieldName, value)

  const handleTagsChange = (newTags: string[]) => formik.setFieldValue('tags', newTags)

  useEffect(() => {
    formik.setValues({
      title: product?.title || '',
      description: product?.description || '',
      gender: product?.gender || '',
      for_kids: product?.for_kids || false,
      price_from: product?.price_from || '',
      discount: product?.discount || '',
      category: product?.category?.id || '',
      country: product?.country || '',
      // eslint-disable-next-line
      //@ts-ignore
      tags: product?.tags || [],
      recommendation: product?.recommendation || '',
      sku: product?.sku || '',
      // eslint-disable-next-line
      //@ts-ignore
      specifications: product?.specifications || [{ title: '', value: '' }],
      publish_date: product?.publish_date || '',
      // eslint-disable-next-line
      //@ts-ignore
      variants: product?.variants || [],
    })
  }, [product])

  return (
    <>
      <p className="text-[23px] font-semibold text-black">Редактирование товара</p>

      <div className="max-w-[528px]">
        <p className="mt-[27.5px] text-[18px] font-[500] leading-[28px] text-neutral-900">Основная информация</p>

        <TextField
          error={formik.touched.title && Boolean(formik.errors.title)}
          errorMessage={formik.touched.title ? formik.errors.title : ''}
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder={t('Название продукта')}
          label={t('Название продукта')}
          className={'mt-5'}
          name="title"
        />

        <CustomSelect
          placeholder={t('Пол')}
          inputLabel={t('Пол')}
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
            value={formik.values.price_from}
            error={formik.touched.price_from && Boolean(formik.errors.price_from)}
            errorMessage={formik.touched.price_from ? formik.errors.price_from : ''}
            onChange={formik.handleChange}
            placeholder={t('Цена')}
            label={t('Цена')}
            name="price_from"
          />

          <TextField
            value={formik.values.discount}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            errorMessage={formik.touched.discount ? formik.errors.discount : ''}
            onChange={formik.handleChange}
            placeholder={t('Скидка')}
            label={t('Скидка')}
            name="discount"
            helperText="не обязательно"
          />
        </div>

        <div className={'mt-5 flex w-[100%] gap-[24px]'}>
          <Autocomplete
            placeholder={t('Основная категория')}
            inputLabel={t('Основная категория')}
            options={categories || []}
            onChange={(value) => {
              handleFieldsValueChange('parent_category', value)
              formik.setFieldValue('category', '')
            }}
            value={formik.values.parent_category}
            error={formik.touched.parent_category && !!formik.errors.parent_category}
            errorMessage={formik.touched.parent_category ? formik.errors.parent_category : ''}
            width="100%"
            fieldTitle="title"
            fieldValue="id"
          />

          <Autocomplete
            placeholder={t('Подкатегория')}
            inputLabel={t('Подкатегория')}
            options={subcategories || []}
            onChange={(value) => handleFieldsValueChange('category', value)}
            error={formik.touched.category && Boolean(formik.errors.category)}
            value={formik.values.category}
            errorMessage={formik.touched.category ? formik.errors.category : ''}
            width="100%"
            fieldTitle="title"
            fieldValue="id"
          />
        </div>

        <Autocomplete
          placeholder={t('Страна производителя ')}
          inputLabel={t('Страна производителя ')}
          options={countriesData || []}
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
        <p className="mt-[30px] text-[18px] font-[500] leading-[28px] text-neutral-900">Дополнительная информация</p>

        <TextArea
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          errorMessage={formik.touched.description ? formik.errors.description : ''}
          onChange={formik.handleChange}
          placeholder={t('Описание товара')}
          label={t('Описание товара')}
          name="description"
          className={'mt-5'}
        />

        <ProductDetailsField formik={formik} fieldName="specifications" className={'mt-5'} />

        <TextArea
          value={formik.values.recommendation}
          error={formik.touched.recommendation && Boolean(formik.errors.recommendation)}
          errorMessage={formik.touched.recommendation ? formik.errors.recommendation : ''}
          onChange={formik.handleChange}
          placeholder={t('Рекомендации по уходу')}
          label={t('Рекомендации по уходу')}
          name="recommendation"
          className={'mt-5'}
        />

        <div className={'mb-10 mt-[30px]'}>
          <p className={'mb-3 text-[16px] font-[500] text-neutral-900'}>Тэги для поиска</p>

          <AddTagInput tags={formik.values.tags} onChange={handleTagsChange} />
        </div>
      </div>

      <Button
        variant={BUTTON_STYLES.primaryCta}
        className="mx-auto max-w-[184px]"
        onClick={() => formik.handleSubmit()}
        type="button"
      >
        <div className="flex items-center gap-[10px]">
          Готово
          <Check />
        </div>
      </Button>
    </>
  )
}
