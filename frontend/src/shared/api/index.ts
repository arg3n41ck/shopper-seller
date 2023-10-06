import {AccountsApi} from "./gen";
import apiClient from './apiClient'

const $apiClient: any = apiClient
export const $apiAccounts = new AccountsApi(undefined, undefined, $apiClient)
