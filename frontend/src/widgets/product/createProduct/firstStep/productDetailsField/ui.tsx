import React, { FC } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Plus, Trash2 } from 'react-feather'
import TextField from '@/shared/ui/inputs/textField'
import { Button } from '@/shared/ui/buttons'
import clsx from 'classnames'
interface SpecificationInput {
  title: string
  value: string
}

interface ProductDetailsFieldProps {
  title?: string
  fieldName: string
  className?: string
  // eslint-disable-next-line
  formik: any
}

const ProductDetailsField: FC<ProductDetailsFieldProps> = ({ title, fieldName, className, formik }) => {
  const handleAddInput = () => {
    const updatedValues = [...formik.values[fieldName]]
    updatedValues.push({ title: '', value: '' })
    formik.setFieldValue(fieldName, updatedValues)
  }

  const handleRemoveInput = (inputIndexToDelete: number) => {
    const updatedValues = [...formik.values[fieldName]].filter((_, index: number) => index !== inputIndexToDelete)
    formik.setFieldValue(fieldName, updatedValues)
  }

  const handleTitleChange = (index: number, value: string) => {
    const updatedValues = [...formik.values[fieldName]]

    if (index >= 0 && index < updatedValues.length) {
      const updatedItem = { ...updatedValues[index] }
      updatedItem.title = value
      updatedValues[index] = updatedItem
      formik.setFieldValue(fieldName, updatedValues)
    }
  }

  const handleValueChange = (index: number, value: string) => {
    const updatedValues = [...formik.values[fieldName]]

    if (index >= 0 && index < updatedValues.length) {
      const updatedItem = { ...updatedValues[index] }
      updatedItem.value = value
      updatedValues[index] = updatedItem
      formik.setFieldValue(fieldName, updatedValues)
    }
  }

  return (
    <div className={clsx(className, 'flex flex-col gap-[25px]')}>
      {title && <p className="text-[16px] font-semibold  text-[#000]">{title}</p>}

      <div className={'grid-cols-[1fr, 68px] grid w-[100%]'}>
        <div className="flex flex-col gap-6">
          {formik.values[fieldName].map((input: SpecificationInput, index: number) => (
            <div className="flex items-end gap-5" key={index}>
              <div className="grid w-full grid-cols-[1fr_68px] items-center gap-6">
                <div>
                  <TextField
                    value={input.title}
                    placeholder={'Состав товара'}
                    label={'Состав товара'}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    value={input.value}
                    placeholder={'Кол-во'}
                    label={'Кол-во'}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                </div>
              </div>

              <Button
                variant={BUTTON_STYLES.primaryCta}
                className="max-w-[48px]"
                onClick={() => handleRemoveInput(index)}
              >
                <Trash2 size={24} />
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={handleAddInput} variant={BUTTON_STYLES.primaryCta} className={'mx-auto mt-5 max-w-[48px]'}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export default ProductDetailsField
