import { MyProductsMainSection } from '@/sections-pages/seller-productList'
import { LKSellerLayout } from 'src/widgets/layouts/lkSellerLayout'
import { $apiProductsApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const { data } = await $apiProductsApi.productsSellerProductsList()
  return data.results
}

const ProductsList = () => {
  const { data } = useQuery(['products'], fetchProducts)

  return (
    <LKSellerLayout>
      <MyProductsMainSection products={data} />
    </LKSellerLayout>
  )
}

export default ProductsList
