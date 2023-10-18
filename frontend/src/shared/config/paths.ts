import { TypedPathAuth, TypedPathLKSeller, TypedPathLKSellerCreateProduct } from '../lib/types/pathsTypes'

const AUTH_ROOT = '/auth'
const LK_SELLER_ROOT = '/lk-seller'
const LK_SELLER_CREATE_PRODUCT = '/lk-seller/products-list/create-product'
// const MAIN_PAGE_ROOT = '/'

function path(root = '', ...segments: string[]): string {
  segments = segments || []
  return `${root}${segments.join('')}`.replace(/\/+/g, '/')
}

export const PATH_AUTH: TypedPathAuth = {
  root: AUTH_ROOT,
  logIn: path(AUTH_ROOT, '/log-in'),
  signUp: path(AUTH_ROOT, '/sign-up'),
  resetPassword: path(AUTH_ROOT, '/reset-password'),
  newPassword: path(AUTH_ROOT, '/new-password'),
  signUpBuyer: path(AUTH_ROOT, '/sign-up/buyer'),
  signUpSeller: path(AUTH_ROOT, '/sign-up/seller'),
  authSuccess: path(AUTH_ROOT, '/success'),
}

export const PATH_LK_SELLER: TypedPathLKSeller = {
  root: LK_SELLER_ROOT,
  aboutShop: path(LK_SELLER_ROOT, '/about-shop'),
  myProducts: path(LK_SELLER_ROOT, '/products-list'),
  archive: path(LK_SELLER_ROOT, '/archive'),
  settings: path(LK_SELLER_ROOT, '/settings'),
}

export const PATH_LK_SELLER_CREATE_PRODUCT: TypedPathLKSellerCreateProduct = {
  step1: path(LK_SELLER_CREATE_PRODUCT),
  step2: path(LK_SELLER_CREATE_PRODUCT, `/variants-product`),
  step3: path(LK_SELLER_CREATE_PRODUCT, `/publication-date`),
  previewProduct: path(LK_SELLER_CREATE_PRODUCT, `/preview-product`),
}
