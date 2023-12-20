import React, { useEffect, useState } from 'react'
import { SellerClient } from '@/shared/apis/sellerClient'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/config'
import Autocomplete from '@/shared/ui/inputs/autocomplete'
import { Button } from 'src/shared/ui/buttons'
import Checkbox from 'src/shared/ui/inputs/checkbox'
import { TextArea } from '@/shared/ui/inputs/textArea'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { VariantProduct } from '../../secondStep'
import { ProductDetailsField } from '../productDetailsField'
import { CreateVariantModal } from '../../secondStep/modals'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { CheckCircle, Edit, Plus } from 'react-feather'
import { useQuery } from '@tanstack/react-query'
import { handleApiError } from '@/shared/lib/helpers'
import { TypeProduct, TypeVariant } from '@/shared/lib/types/sellerTypes'
import CustomSwitch from '@/shared/ui/inputs/switch'
import { CustomSelectHover } from '@/shared/ui/selects/default/CustomSelectHover'
import { countriesData, genders } from '@/shared/lib/consts/globals'
import { CustomSelect } from '@/shared/ui'
import { useCreateProduct } from '../../model'
import { useConfirmOnExit } from '@/shared/lib/hooks/useConfirmOnExit'

const sellerClient = new SellerClient()

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
    category: yup.string().required(t('Выберите категорию продукта')),
    recommendation: yup.string().required(t('Введите рекомендации по уходу')),
    tags: yup.array(),
    pre_order: yup.number(),
  })

export const InfoAboutProduct = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [createVariantModal, setCreateVariantModal] = useState(false)
  const [createVariantModalValues, setCreateVariantModalValues] = useState<TypeVariant>({
    title: '',
    images: [],
    size_variants: [{ size: '', quantity: '', price: null }],
    description: '',
    is_main: false,
  })
  const { data: categories } = useQuery(['categories'], sellerClient.fetchCategories)
  const createProductFormValues = useCreateProduct()
  const {
    title,
    description,
    gender,
    for_kids,
    price_from,
    discount,
    country,
    category,
    tags,
    recommendation,
    specifications,
    variants,
    is_pre_order,
    pre_order_days,
    setProductData,
  } = createProductFormValues
  const [allowNavigation, setAllowNavigation] = useState(false)

  const formik = useFormik<TypeProduct>({
    initialValues: {
      title: '',
      description: '',
      gender: '',
      for_kids: false,
      price_from: '',
      discount: '',
      country: '',
      category: '',
      tags: [],
      recommendation: '',
      specifications: [{ title: '', value: '' }],
      variants: [],
      is_pre_order: false,
      pre_order_days: '',
    },

    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      try {
        setAllowNavigation(true)
        await setProductData(values)

        router.push({
          pathname: `${PATH_LK_SELLER_CREATE_PRODUCT.previewProduct}`,
        })

        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        handleApiError(error)
      }
    },
  })

  const handleShowCreateVariantModal = () => {
    setCreateVariantModal((prev) => !prev)
    setCreateVariantModalValues({
      title: '',
      images: [],
      size_variants: [{ size: '', quantity: '', price: null }],
      description: '',
      is_main: false,
    })
  }

  const handleFieldsValueChange = (fieldName: string, value: string) => formik.setFieldValue(fieldName, value)

  const handleSetMainVariant = (selectedIndex: number | string) => {
    const updatedVariants = formik.values.variants.map((variant, index) => ({
      ...variant,
      is_main: index === selectedIndex ? !variant.is_main : false,
    }))

    formik.setFieldValue('variants', updatedVariants)
  }

  const addVariant = (value: TypeVariant) => {
    let updatedVariants = [...formik.values.variants]

    if (value.is_main) {
      updatedVariants = updatedVariants.map((variant) => ({ ...variant, is_main: false }))
    }

    updatedVariants.push(value)

    formik.setFieldValue('variants', updatedVariants)
  }

  const editVariant = (index: number | string, value: TypeVariant) => {
    const updatedVariants = [...formik.values.variants]
    updatedVariants[+index] = value
    formik.setFieldValue('variants', updatedVariants)
  }

  const removeVariant = (variantIndexToRemove: number | string) => {
    const updatedVariants = formik.values.variants.filter(
      (_: TypeVariant, index: number) => index !== variantIndexToRemove,
    )

    formik.setFieldValue('variants', updatedVariants)

    setCreateVariantModalValues({
      title: '',
      images: [],
      size_variants: [{ size: '', quantity: '' }],
      description: '',
      is_main: false,
    })
    handleShowCreateVariantModal()
  }

  useConfirmOnExit(formik.dirty, allowNavigation)

  useEffect(() => {
    formik.setValues({
      title,
      description,
      gender,
      for_kids,
      price_from,
      discount,
      country,
      category,
      tags,
      recommendation,
      specifications,
      variants,
      is_pre_order,
      pre_order_days,
    })
  }, [createProductFormValues])

  return (
    <>
      <div className="max-w-[528px]">
        <p className="text-[28px] font-[700] leading-[40px] text-neutral-900">Добавить новый товар</p>

        <p className="mt-10 text-[18px] font-[500] leading-[28px] text-neutral-900">Информация о продукте</p>

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
          fieldTitle="title"
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
          placeholder={t('Страна производителя ')}
          inputLabel={t('Страна производителя ')}
          options={countriesData}
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

      <TextArea
        value={formik.values.recommendation}
        error={formik.touched.recommendation && Boolean(formik.errors.recommendation)}
        errorMessage={formik.touched.recommendation ? formik.errors.recommendation : ''}
        onChange={formik.handleChange}
        placeholder={t('Рекомендации по уходу')}
        label={t('Рекомендации по уходу')}
        name="recommendation"
        className={'mt-5 max-w-[528px]'}
      />

      <p className="mt-[30px] text-[18px] font-[500] leading-[28px] text-neutral-900">Варианты</p>

      <div className="flex w-full items-center gap-6">
        <div className="relative flex max-w-[528px] items-start gap-6 overflow-x-scroll">
          {!!formik.values.variants?.length &&
            formik.values.variants.map((variant: TypeVariant, index: number) => (
              <div key={index} className="group/edit relative overflow-hidden">
                <VariantProduct data={variant} />
                <Button
                  onClick={() => {
                    setCreateVariantModalValues({ ...formik.values.variants[index], index })
                    setCreateVariantModal(true)
                  }}
                  variant={BUTTON_STYLES.primaryCtaIndigo}
                  className="invisible absolute right-2 top-2 z-[1] h-[25px] max-w-[24px] px-1 py-2 !text-[12px] !font-normal opacity-50 group-hover/edit:visible"
                >
                  <Edit size={16} />
                </Button>

                <Button
                  onClick={() => handleSetMainVariant(index)}
                  variant={BUTTON_STYLES[variant.is_main ? 'primaryCta' : 'withoutBackground']}
                  className="mt-4 !p-1"
                >
                  <div className="flex items-center gap-2">
                    {variant.is_main && <CheckCircle size={16} />}
                    {variant.is_main ? 'Основной' : 'Сделать основным'}
                  </div>
                </Button>
              </div>
            ))}
        </div>

        <Button onClick={handleShowCreateVariantModal} variant={BUTTON_STYLES.primaryCta} className={'max-w-[48px]'}>
          <Plus />
        </Button>
      </div>

      <div className="mt-[60px] flex justify-end">
        <Button
          onClick={() => formik.handleSubmit()}
          type="submit"
          className={'max-w-[252px]'}
          variant="WithoutBackgroundButton"
        >
          Продолжить
        </Button>
      </div>

      {createVariantModal && (
        <CreateVariantModal
          open={createVariantModal}
          handleClose={handleShowCreateVariantModal}
          addVariant={addVariant}
          editVariant={editVariant}
          removeVariant={removeVariant}
          defaultValues={createVariantModalValues}
          handleSetMainVariant={handleSetMainVariant}
        />
      )}
    </>
  )
}
