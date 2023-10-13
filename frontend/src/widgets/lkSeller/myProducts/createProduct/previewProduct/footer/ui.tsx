import React, { FC } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import Button from '@/shared/ui/button'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'react-feather'

interface PreviewProductFooterProps {
  handlePublishProduct: (type: string) => void
}

const FooterPreviewProduct: FC<PreviewProductFooterProps> = ({ handlePublishProduct }) => {
  const router = useRouter()
  const handleNavigateToPrevPage = () => router.back()

  return (
    <div className="mt-[170px]">
      <div className="border-[1px] border-neutral-300" />
      <div className="flex h-[150px] w-full items-center justify-between">
        <Button onClick={handleNavigateToPrevPage} variant={BUTTON_STYLES.onlyText} className={'w-[50px]'}>
          <div className={'flex items-center gap-2 '}>
            <ArrowLeft /> Назад
          </div>
        </Button>

        <div className="flex gap-[32px]">
          <Button onClick={() => handlePublishProduct('draft')} variant={BUTTON_STYLES.withoutBackground} size="large">
            <div className={'flex items-center gap-2 '}>Сохранить как черновик</div>
          </Button>

          <Button onClick={() => handlePublishProduct('publish')} variant={BUTTON_STYLES.primaryCta} size="large">
            Опубликовать
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FooterPreviewProduct
