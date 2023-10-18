import { CreateProductLayout } from 'src/widgets/layouts'
import { PreviewProduct } from '@/widgets/product'

export const PreviewProductSection = () => {
  return (
    <>
      <CreateProductLayout>
        <PreviewProduct />
      </CreateProductLayout>
    </>
  )
}
