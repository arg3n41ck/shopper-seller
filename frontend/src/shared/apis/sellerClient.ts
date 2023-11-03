import { $apiAccountsApi, $apiProductsApi, $apiSellersApi } from '../api'
import { ShopUpdate } from '../api/gen'
import { TypeUser } from '../lib/types/authTypes'
import { TypeProductFilters } from '../lib/types/sellerTypes'

export class SellerClient {
  async fetchCategories() {
    const { data } = await $apiProductsApi.productsCategoriesList()
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

  async updateShop({ slug, shopData }: { slug: string; shopData: ShopUpdate }) {
    const { data } = await $apiSellersApi.sellersSellerShopsPartialUpdate(slug, shopData)
    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async updateUser({ userData }) {
    const { data } = await $apiAccountsApi.accountsUsersMePartialUpdate(userData)
    return data
  }

  async fetchProducts({ category, gender, status, limit, search, offset }: TypeProductFilters) {
    const { data } = await $apiProductsApi.productsSellerProductsList(
      gender || undefined,
      undefined,
      category,
      status || undefined,
      undefined,
      search,
      undefined,
      limit,
      offset,
    )
    return data
  }
}
