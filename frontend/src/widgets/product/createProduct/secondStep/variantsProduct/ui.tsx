import React, { FC, useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { Plus } from 'react-feather'
import { CreateVariantModal } from '../modals/createVariantModal'
import { VariantProduct } from '../variantProduct'
import { Button } from '@/shared/ui/buttons'
import { TypeVariant, TypeVariants } from '@/shared/lib/types/sellerTypes'

interface VariantsProductProps {
  data: TypeVariants
}

const VariantsProduct: FC<VariantsProductProps> = ({ data }) => {
  const [createVariantModal, setCreateVariantModal] = useState(false)

  const handleShowCreateVariantModal = () => setCreateVariantModal((prev) => !prev)

  // useEffect(() => {
  //   id && dispatch(fetchProduct(id))
  // }, [])

  return (
    <>
      <div className="flex w-full items-center gap-6">
        <div className="relative flex max-w-[528px] items-start gap-6 overflow-x-scroll">
          {!!data?.length &&
            data.map((variant: TypeVariant, index: number) => <VariantProduct key={index} data={variant} />)}
        </div>

        <Button onClick={handleShowCreateVariantModal} variant={BUTTON_STYLES.primaryCta} className={'max-w-[48px]'}>
          <Plus />
        </Button>
      </div>

      {createVariantModal && (
        <CreateVariantModal open={createVariantModal} handleClose={handleShowCreateVariantModal} />
      )}
    </>
  )
}

export default VariantsProduct
