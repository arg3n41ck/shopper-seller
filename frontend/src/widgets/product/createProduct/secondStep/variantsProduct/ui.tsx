import React, { FC, useEffect, useState } from 'react'
import { steps } from 'src/widgets/layouts/createProductLayout'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/config'
import { fetchProduct } from '@/entities/seller/model/slice'
import { Button } from 'src/shared/ui/buttons'
import { useRouter } from 'next/router'
import { ChevronRight, Plus } from 'react-feather'
import CreateProductPaginationSlot from '../../slots/createProductStepPagination/ui'
import CreateProductSubmitButtonSlot from '../../slots/createProductSubmitButtonSlot/ui'
import { CreateVariantModal } from '../modals/createVariantModal'
import { VariantProduct } from '../variantProduct'
import cn from 'classnames'

interface VariantsProductProps {
  data: any
}

const VariantsProduct: FC<VariantsProductProps> = ({ data }) => {
  const router = useRouter()
  const id = (router.query?.id as string) || ''
  const dispatch = useAppDispatch()
  const [createVariantModal, setCreateVariantModal] = useState(false)
  const { product } = useAppSelector((state) => state.seller)

  const handleShowCreateVariantModal = () => setCreateVariantModal((prev) => !prev)

  const handleNavigate = () =>
    !!product?.preview?.length &&
    router.push({
      pathname: PATH_LK_SELLER_CREATE_PRODUCT.step3,
      query: { id },
    })

  useEffect(() => {
    id && dispatch(fetchProduct(id))
  }, [])

  return (
    <>
      <div className="flex w-full items-center gap-[24px]">
        <div className="relative flex max-w-[528px] items-start gap-[24px] overflow-x-scroll">
          {/* {!!product?.preview?.length &&
              product.preview.map((preview: any) => (
                <VariantProduct key={preview.id} data={preview} />
              ))} */}

          {!!data?.length && data.map((preview: any) => <VariantProduct key={preview.id} data={preview} />)}
        </div>

        <Button onClick={handleShowCreateVariantModal} variant={BUTTON_STYLES.primaryCta} className={'max-w-[48px]'}>
          <Plus />
        </Button>
      </div>

      <CreateProductPaginationSlot>
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn('h-[24px] w-[24px] cursor-pointer rounded-[50%] bg-neutral-300', {
              ['!bg-primaryDash600']: router.pathname === step.path,
            })}
            onClick={() => {
              if (index === 2 && (!product?.preview?.length || !id)) return
              router.push({ pathname: step.path, query: { id } })
            }}
          />
        ))}
      </CreateProductPaginationSlot>

      <CreateProductSubmitButtonSlot>
        <Button variant={BUTTON_STYLES.primaryCtaIndigo} type="submit" onClick={handleNavigate}>
          <div className="flex items-center gap-[10px]">
            Продолжить
            <ChevronRight />
          </div>
        </Button>
      </CreateProductSubmitButtonSlot>

      {createVariantModal && (
        <CreateVariantModal open={createVariantModal} handleClose={handleShowCreateVariantModal} />
      )}
    </>
  )
}

export default VariantsProduct
