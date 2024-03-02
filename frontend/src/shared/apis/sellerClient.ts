import { $apiAccountsApi, $apiOrdersApi, $apiProductsApi, $apiSellersApi } from '../api'
import { ProductCreate, ProductUpdate, ProductVariantCreate } from '../api/gen'
import { TypeProductFilters } from '../lib/types/sellerTypes'

export class SellerClient {
  async fetchCategories() {
    const { data } = await $apiProductsApi.productsCategoriesList()
    return data
  }

  async fetchOrders({
    status,
    limit,
    search,
    offset,
  }: {
    status: string
    limit: number
    search: string
    offset: number
  }) {
    const { data } = await $apiOrdersApi.ordersSellerOrdersList(status, search, undefined, limit, offset)
    return data
  }

  async fetchOrder(id: number) {
    const { data } = await $apiOrdersApi.ordersSellerOrdersRead(id)
    return data
  }

  async fetchProduct(slug: string) {
    const { data } = await $apiProductsApi.productsSellerProductsRead(slug)
    return data
  }

  async fetchSpecifications() {
    const { data } = await $apiProductsApi.productsSpecificationsList()
    return data
  }

  async fetchTags() {
    const { data } = await $apiProductsApi.productsTagsList()
    return data
  }

  async fetchMe() {
    const { data } = await $apiAccountsApi.accountsUsersMeRead()

    return data
  }

  async fetchShop() {
    const { data } = await $apiSellersApi.sellersSellerShopsList()
    return data.results[0]
  }

  async fetchVariant(slug: string) {
    const { data } = await $apiProductsApi.productsSellerProductVariantsRead(slug)
    return data
  }

  async fetchReviews(id: string) {
    const { data } = await $apiProductsApi.productsReviewsList(id)
    return data.results
  }

  async editProduct(slug: string, productData: ProductUpdate) {
    const { data } = await $apiProductsApi.productsSellerProductsPartialUpdate(slug, productData)
    return data
  }

  async createTag(tag: string) {
    const { data } = await $apiProductsApi.productsTagsCreate({ title: tag })
    return data
  }

  async createProduct(body: ProductCreate) {
    const { data } = await $apiProductsApi.productsSellerProductsCreate(body)
    return data
  }

  async createVariant(body: ProductVariantCreate) {
    const { data } = await $apiProductsApi.productsSellerProductVariantsCreate(body)
    return data
  }

  async updateVariantMainImage(variant: number = 0, isMain: boolean) {
    const { data } = await $apiProductsApi.productsSellerVariantImagesPartialUpdate(variant, undefined, isMain)
    return data
  }

  async updateShop({
    slug,
    shopData: { title, description, logo, tiktok_link, instagram_link, whats_app_link, banner, advertising_slogan },
  }: {
    slug: string
    shopData: {
      title: string
      description: string
      logo: File | null
      tiktok_link: string
      instagram_link: string
      whats_app_link: string
      banner: File | null
      advertising_slogan: string
    }
  }) {
    const { data } = await $apiSellersApi.sellersSellerShopsPartialUpdate(
      slug,
      title,
      description,
      logo,
      tiktok_link,
      instagram_link,
      whats_app_link,
      banner,
      advertising_slogan,
    )
    return data
  }

  async uploadProductVariantImage(variant: number = 0, image: File, isMain: boolean) {
    const { data } = await $apiProductsApi.productsSellerVariantImagesCreate(variant, image, isMain)
    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async updateUser({ userData }) {
    const { data } = await $apiAccountsApi.accountsUsersMePartialUpdate(userData)
    return data
  }

  async fetchProducts({ category, color, size, gender, status, limit, search, offset }: TypeProductFilters) {
    const { data } = await $apiProductsApi.productsSellerProductsList(
      gender || undefined,
      undefined,
      category,
      status || undefined,
      undefined,
      color,
      size,
      search,
      undefined,
      limit,
      offset,
    )
    return data
  }
}
