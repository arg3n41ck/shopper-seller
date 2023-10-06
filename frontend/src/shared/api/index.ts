import {AccountsApi, CustomersApi} from "./gen";
import apiClient from './apiClient'

const $apiClient = apiClient as never
export const $apiAccounts = new AccountsApi(undefined, undefined, $apiClient)
export const $apiCustomers = new CustomersApi(undefined, undefined, $apiClient)
