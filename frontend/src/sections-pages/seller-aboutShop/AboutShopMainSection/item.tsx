import React, { FC, useState } from 'react'
import TextField from '@/shared/ui/inputs/textField'
import { useFormik } from 'formik'
import { Check, Edit2, MapPin, Phone, Trash2 } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { TypeAddressData } from '@/shared/lib/types/sellerTypes'
import { isEqual } from 'lodash'
import { DeleteAddressBackdrop } from './modals/deleteAddressBackboard'
import cn from 'classnames'
import { handleApiError } from '@/shared/lib/helpers'

interface Props {
  data: TypeAddressData
  showEdit: boolean
  onOpen: (id: string) => void
  onClose: (id: string) => void
  requestAddress: (value: TypeAddressData) => void
  action: 'create' | 'edit'
  deleteAddress?: (id: string) => void
}

interface FormValues {
  address: string
  phone_number: string
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    address: yup.string(),
    phone_number: yup
      .string()
      .test('phone_number', t('Номер телефона должен быть в формате +996555667788'), (value) => {
        if (!value) {
          return false
        }
        const phoneNumberRegex = /^\+996\d{9}$/
        return phoneNumberRegex.test(value)
      }),
  })

export const AddressItem: FC<Props> = ({ data, showEdit, onOpen, onClose, action, deleteAddress }) => {
  const { t } = useTranslation()
  const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false)

  const formik = useFormik<FormValues>({
    initialValues: {
      address: data.address || '',
      phone_number: data.phone_number || '+996',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values, { resetForm }) => {
      const { address, phone_number } = values

      if (isEqual(values, formik.initialValues) || !address || !phone_number) {
        onClose(data.id)
        return
      }

      try {
        // await requestAddress({ id: data.id, ...values })
        // await dispatch(fetchBranches())
        onClose(data.id)
        resetForm()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } catch (error: AxiosError) {
        handleApiError(error)
      }
    },
  })

  const handleShowBackdrop = () => setShowDeleteBackdrop((prev) => !prev)

  const deleteAddressById = async () => {
    if (deleteAddress) await deleteAddress(data.id)
  }

  return (
    <>
      <div
        className={cn(
          `
          flex h-min min-h-[226px] w-full max-w-[252px] flex-col gap-[34px] rounded-[20px] border-[1px]
          border-neutral-600 bg-neutral-50 px-[16px] py-[12px]
          `,
          { ['!gap-0']: showEdit },
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-[23.04px] font-[600] leading-[28px] text-neutral-900">Филиал</p>
          <div className="flex items-center gap-[10px]">
            {!showEdit ? (
              <Edit2 onClick={() => onOpen(data.id)} cursor="pointer" />
            ) : (
              <>
                {action === 'edit' && <Trash2 onClick={handleShowBackdrop} cursor="pointer" />}
                <Check
                  cursor="pointer"
                  onClick={() => {
                    formik.handleSubmit()
                  }}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[17px]">
          {!showEdit ? (
            <>
              <div className="flex flex-col gap-[8px] leading-[19px] text-neutral-900">
                <p className="text-[16px] font-[600]">Адрес</p>
                <p className="break-words text-[16px]">{data.address}</p>
              </div>
              <div className="flex flex-col gap-[8px] leading-[19px] text-neutral-900">
                <p className="text-[16px] font-[600]">Телефон</p>
                <p className="break-words text-[16px]">{data.phone_number}</p>
              </div>
            </>
          ) : (
            <>
              <TextField
                label="Адрес"
                value={formik.values.address}
                onChange={formik.handleChange}
                name="address"
                error={formik.touched.address && Boolean(formik.errors.address)}
                errorMessage={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                endAdornment={<MapPin />}
              />
              <TextField
                label="Телефон"
                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                errorMessage={
                  formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''
                }
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                endAdornment={<Phone />}
                name="phone_number"
              />
            </>
          )}
        </div>
      </div>

      {/* //? Backdrop */}

      {showDeleteBackdrop && (
        <DeleteAddressBackdrop
          open={showDeleteBackdrop}
          onClose={handleShowBackdrop}
          deleteAddress={deleteAddressById}
        />
      )}
    </>
  )
}
