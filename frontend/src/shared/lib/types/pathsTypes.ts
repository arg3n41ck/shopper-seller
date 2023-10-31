type Paths<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => string ? (...args: A) => string : Paths<T[K]>
}

interface PathAuthStructure {
  root: string
  logIn: string
  signUp: string
  resetPassword: string
  newPassword: string
  signUpBuyer: string
  signUpSeller: string
  authSuccess: string
}

export type TypedPathAuth = Paths<PathAuthStructure>
interface PathLKSellerStructure {
  root: string
  aboutShop: string
  productsList: string
  archive: string
  settings: string
}

export type TypedPathLKSeller = Paths<PathLKSellerStructure>

interface PathLKSellerCreateProduct {
  step1: string
  step2: string
  step3: string
  previewProduct: string
}

export type TypedPathLKSellerCreateProduct = Paths<PathLKSellerCreateProduct>
