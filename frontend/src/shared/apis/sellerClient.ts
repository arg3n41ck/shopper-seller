import { $apiAccountsApi, $apiProductsApi, $apiSellersApi } from '../api'
import { ProductUpdate } from '../api/gen'
import { TypeUser } from '../lib/types/authTypes'
import { TypeProductFilters } from '../lib/types/sellerTypes'

export class SellerClient {
  async fetchCategories() {
    const { data } = await $apiProductsApi.productsCategoriesList()
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

    const user: TypeUser = {
      // eslint-disable-next-line
      // @ts-ignore
      id: data.id,
      // eslint-disable-next-line
      // @ts-ignore
      email: data.email,
      // eslint-disable-next-line
      // @ts-ignore
      phone_number: data.phone_number,
      // eslint-disable-next-line
      // @ts-ignore
      type: data.type,
      // eslint-disable-next-line
      // @ts-ignore
      first_name: data.first_name,
      // eslint-disable-next-line
      // @ts-ignore
      last_name: data.last_name,
    }

    return user
  }

  async fetchShop() {
    const { data } = await $apiSellersApi.sellersSellerShopsList()
    return data.results[0]
  }

  async fetchVariant(slug: string) {
    const { data } = await $apiProductsApi.productsSellerProductVariantsRead(slug)
    return data
  }

  async editProduct(slug: string, productData: ProductUpdate) {
    const { data } = await $apiProductsApi.productsSellerProductsPartialUpdate(slug, productData)
    return data
  }

  async createTag(tag: string) {
    const { data } = await $apiProductsApi.productsTagsCreate({ title: tag })
    return data
  }

  async updateVariantMainImage(variant: number = 0, isMain: boolean) {
    const { data } = await $apiProductsApi.productsSellerVariantImagesPartialUpdate(variant, undefined, isMain)
    return data
  }

  async updateShop({
    slug,
    shopData: { title, description, logo },
  }: {
    slug: string
    shopData: { title: string; description: string; logo: File | null }
  }) {
    const { data } = await $apiSellersApi.sellersSellerShopsPartialUpdate(slug, title, description, logo)
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
