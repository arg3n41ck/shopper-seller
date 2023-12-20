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
import Checkbox from '@/shared/ui/inputs/checkbox'
import Autocomplete from '@/shared/ui/inputs/autocomplete'
import { TextArea } from '@/shared/ui/inputs/textArea'
import { ProductDetailsField } from '../../createProduct'
import { Button } from '@/shared/ui/buttons'
import { $apiProductsApi } from '@/shared/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TypeProduct } from '@/shared/lib/types/sellerTypes'
import { Product, ProductCreate } from '@/shared/api/gen'
import { handleApiError, removeEmptyFields } from '@/shared/lib/helpers'
import { convertStringTagsToIds } from '@/shared/lib/helpers/convertStringTagsToIds'
import CustomSwitch from '@/shared/ui/inputs/switch'
import { CustomSelectHover } from '@/shared/ui/selects/default/CustomSelectHover'
import { countriesData, genders } from '@/shared/lib/consts/globals'
import { CustomSelect } from '@/shared/ui'

const sellerClient = new SellerClient()

const editProduct = async (productId: string, updatedData: ProductCreate) => {
  const response = await $apiProductsApi.productsSellerProductsPartialUpdate(productId, updatedData)
  return response.data
}

interface ProductEditPageProps {
  product: Product
}

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
    discount: yup
      .number()
      .typeError(t('Скидка должна быть числом'))
      .min(0, t('Скидка должна быть не меньше 0'))
      .max(100, t('Скидка должна быть не больше 100')),
    recommendation: yup.string().required(t('Введите рекомендации по уходу')),
    tags: yup.array(),
    publish_date: yup.string(),
  })

export const ProductEditPage: FC<ProductEditPageProps> = ({ product }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const initialValuesRef = useRef(null)
  const mutationEditProduct = useMutation(({ id, values }: { id: string; values: ProductCreate }) =>
    editProduct(id, values),
  )
  const { data: categories } = useQuery(['categories'], sellerClient.fetchCategories)
  const queryClient = useQueryClient()

  const formik = useFormik<TypeProduct>({
    initialValues: {
      title: '',
      description: '',
      gender: '',
      for_kids: false,
      price_from: '',
      discount: '',
      category: '',
      country: '',
      tags: [],
      recommendation: '',
      specifications: [
        { title: '', value: '' },
        { title: '', value: '' },
      ],
      variants: [],
      is_pre_order: false,
      pre_order_days: '',
    },

    innerRef: initialValuesRef,
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        // eslint-disable-next-line
        const { variants, tags, ...restValues } = values

        if (restValues.discount === '') {
          restValues.discount = 0
        }

        const stringTags = tags.filter((tag) => typeof tag === 'string')

        const createdTagIds = await convertStringTagsToIds(stringTags)

        const updatedTags = values.tags.map((tag) => (typeof tag === 'string' ? createdTagIds.shift() : tag))

        // eslint-disable-next-line
        //@ts-ignore
        await mutationEditProduct.mutateAsync({ id, values: { ...removeEmptyFields(restValues), tags: updatedTags } })
        await queryClient.invalidateQueries(['product'])
        await queryClient.invalidateQueries(['tags'])
        router.back()
        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        handleApiError(error)
      }
    },
  })

  const handleFieldsValueChange = (fieldName: string, value: string) => formik.setFieldValue(fieldName, value)

  const handleTagsChange = (newTags: string[]) => formik.setFieldValue('tags', newTags)

  const tagIds = useMemo(() => {
    return product?.tags?.map((tag) => tag.id) || []
  }, [product])

  useEffect(() => {
    formik.setValues({
      title: product?.title || '',
      description: product?.description || '',
      gender: product?.gender || '',
      for_kids: product?.for_kids || false,
      is_pre_order: !!product?.is_pre_order,
      pre_order_days: product?.pre_order_days || '',
      price_from: product?.price_from || '',
      discount: product?.discount || '',
      category: product?.category?.id || '',
      country: product?.country || '',
      // eslint-disable-next-line
      //@ts-ignore
      tags: tagIds,
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
          options={genders}
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
            type="number"
            name="price_from"
          />

          <TextField
            value={formik.values.discount}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            errorMessage={formik.touched.discount ? formik.errors.discount : ''}
            onChange={formik.handleChange}
            placeholder={t('Скидка')}
            label={t('Скидка')}
            type="number"
            name="discount"
            helperText="не обязательно"
          />
        </div>

        <div className={'mt-5 flex w-[100%] gap-[24px]'}>
          <CustomSelectHover
            value={formik.values.category}
            placeholder={'Категория'}
            label={t('Категория')}
            error={formik.touched.category && Boolean(formik.errors.category)}
            errorMessage={formik.touched.category ? formik.errors.category : ''}
            options={categories}
            onClick={(value) => formik.setFieldValue('category', value.id)}
            className="w-full"
            showBreadCrumb
          />
        </div>

        <Autocomplete
          placeholder={t('Страна производителя')}
          inputLabel={t('Страна производителя')}
          options={countriesData || []}
          onChange={(value) => handleFieldsValueChange('country', value)}
          error={formik.touched.country && Boolean(formik.errors.country)}
          value={formik.values.country}
          errorMessage={formik.touched.country ? formik.errors.country : ''}
          width="100%"
          fieldTitle="title"
          fieldValue="title"
          className={'mt-5'}
          helperText="не обязательно"
        />

        <div className="mt-5 flex items-center gap-3">
          <p className="text-base font-medium text-neutral-900">Предзаказ</p>
          <CustomSwitch
            checked={formik.values.is_pre_order}
            onChange={() => formik.setFieldValue('is_pre_order', !formik.values.is_pre_order)}
          />
        </div>

        {formik.values.is_pre_order && (
          <TextField
            value={formik.values.pre_order_days}
            error={formik.touched.pre_order_days && Boolean(formik.errors.pre_order_days)}
            errorMessage={formik.touched.pre_order_days ? formik.errors.pre_order_days : ''}
            onChange={formik.handleChange}
            placeholder={t('Кол-во дней ')}
            label={t('Через сколько дней товар будет готов')}
            name="pre_order_days"
            className="mt-5 max-w-[252px]"
            type="number"
          />
        )}

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
      </div>

      <ProductDetailsField formik={formik} fieldName="specifications" className={'mt-5 max-w-[592px]'} />

      <div className="max-w-[528px]">
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
