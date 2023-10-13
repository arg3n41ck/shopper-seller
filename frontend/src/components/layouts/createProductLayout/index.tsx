import React, { FC, ReactNode, useMemo } from 'react'
import { PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/routes/paths'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { LK_SELLER_STEP_SUBMIT_BUTTON, SlotsProvider } from './slots'

type Step = { path: string }

export const steps: Step[] = [
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step1 },
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step2 },
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step3 },
]

interface CreateProductLayoutProps {
  children: ReactNode
}

const CreateProductLayout: FC<CreateProductLayoutProps> = ({ children }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const isPreviewProductPage = router.pathname === PATH_LK_SELLER_CREATE_PRODUCT.previewProduct

  const currentStep = useMemo(() => steps.findIndex((step) => router.pathname === step.path) + 1, [router.pathname])

  return (
    <>
      <div className="relative h-full bg-none">
        <SlotsProvider>
          {(slots) => (
            <>
              {children}
              {!isPreviewProductPage && (
                <div className="absolute bottom-0 left-[50%] mb-[55px] flex max-w-[266px] translate-x-[-50%] flex-col items-center justify-center gap-[42px]">
                  {slots[LK_SELLER_STEP_SUBMIT_BUTTON]}
                </div>
              )}
            </>
          )}
        </SlotsProvider>
      </div>
    </>
  )
}

export default CreateProductLayout
