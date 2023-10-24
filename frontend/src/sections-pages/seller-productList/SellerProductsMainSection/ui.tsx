import React from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/config'
import { Button } from 'src/shared/ui/buttons'
import { useRouter } from 'next/router'
import { Plus } from 'react-feather'

export const MyProductsMainSection = () => {
  const router = useRouter()

  const navigateToCreateProduct = () => router.push({ pathname: PATH_LK_SELLER_CREATE_PRODUCT.step1 })

  return (
    <>
      <div className="relative h-full bg-none">
        <div className="px-[24px] py-[20px]">
          <p className="text-[23.04px] font-[600] leading-[28px] text-black">Список товаров</p>
          <div className="mt-[27px] flex items-center justify-between">
            <Button onClick={navigateToCreateProduct} variant={BUTTON_STYLES.primaryCta} size="large">
              <div className="flex items-center gap-[10px]">
                Добавить товар
                <Plus />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
