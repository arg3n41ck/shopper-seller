import { AccountsApi, CustomersApi, OrdersApi, ProductsApi, SellersApi } from './gen'
import apiClient from './apiClient'

const $apiClient = apiClient as never
export const $apiAccountsApi = new AccountsApi(undefined, undefined, $apiClient)
export const $apiCustomersApi = new CustomersApi(undefined, undefined, $apiClient)
export const $apiOrdersApi = new OrdersApi(undefined, undefined, $apiClient)
export const $apiProductsApi = new ProductsApi(undefined, undefined, $apiClient)
export const $apiSellersApi = new SellersApi(undefined, undefined, $apiClient)
