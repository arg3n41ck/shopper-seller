import React, { FC } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Button } from 'src/shared/ui/buttons'
import TextField from '@/shared/ui/inputs/textField'
import { FormikErrors, FormikTouched } from 'formik'
import { Plus, Trash2 } from 'react-feather'
import { TypeSizeQuantity } from '@/shared/lib/types/sellerTypes'

interface Props {
  value: TypeSizeQuantity[]
  onChange: (name: string, value: string | TypeSizeQuantity[] | number) => void
  touched: FormikTouched<TypeSizeQuantity>[] | undefined
  error: FormikErrors<TypeSizeQuantity>[] | string | string[] | undefined
  addPriceField?: boolean
  onDelete: (index: number) => void
}

// eslint-disable-next-line
const func = (obj: any, key: string) => {
  return !!obj?.[key]
}
// eslint-disable-next-line
const func2 = (obj: any, key: string) => {
  return obj?.[key]
}

const SizesAndQuantity: FC<Props> = ({ value, onChange, touched, error, addPriceField, onDelete }) => {
  const handleAddFields = async () => {
    // if (isFieldsFilledBeforeIndex(value, value.length)) {
    onChange('size_variants', [...value, { size: '', quantity: '', price: null }])
    // }
  }

  return (
    <>
      {value?.map((sizeQuantityItem: TypeSizeQuantity, index: number) => {
        return (
          <div className="flex items-end gap-[20px]" key={index}>
            <TextField
              name={`size_variants[${index}].size`}
              value={sizeQuantityItem.size}
              onChange={(e) => {
                onChange(`size_variants[${index}].size`, e.target.value)
              }}
              placeholder={'Размер'}
              label={'Размер'}
              error={touched?.[index]?.size && Boolean(func(error?.[index], 'size'))}
              errorMessage={touched?.[index]?.size && func2(error?.[index], 'size')}
            />

            <TextField
              name={`size_variants[${index}].quantity`}
              value={sizeQuantityItem.quantity}
              onChange={(e) => {
                onChange(`size_variants[${index}].quantity`, e.target.value)
              }}
              placeholder={'Количество'}
              type="number"
              label={'Количество'}
              error={touched?.[index]?.quantity && Boolean(func(error?.[index], 'quantity'))}
              errorMessage={touched?.[index]?.quantity && func2(error?.[index], 'quantity')}
            />

            {addPriceField && (
              <TextField
                name={`size_variants[${index}].price`}
                value={sizeQuantityItem.price || ''}
                onChange={(e) => {
                  onChange(`size_variants[${index}].price`, +e.target.value)
                }}
                placeholder={'Цена'}
                label={'Цена'}
                error={touched?.[index]?.price && Boolean(func(error?.[index], 'price'))}
                errorMessage={touched?.[index]?.price && func2(error?.[index], 'price')}
              />
            )}

            <Button variant={BUTTON_STYLES.primaryCta} className="max-w-[48px]" onClick={() => onDelete(index)}>
              <Trash2 size={24} />
            </Button>
          </div>
        )
      })}

      <Button
        onClick={handleAddFields}
        variant={BUTTON_STYLES.primaryCta}
        type="button"
        className={'mx-auto max-w-[48px]'}
      >
        <Plus />
      </Button>
    </>
  )
}

export default SizesAndQuantity
