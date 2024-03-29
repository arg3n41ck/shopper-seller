type TypeAddressData = {
  id: string
  address: string
  phone_number: string
}

type TypeSellerInfoData = {
  shop_name: string
  site: string
  instagram: string
}

type OptionType = {
  id?: string
  name: string
  value: string
}

interface CreateProductState {
  product_name: string
  product_type: string
  price: string
  discount: string
  category_id: string
  subcategory_id: string
  materials: OptionType[]
  details: OptionType[]
  sizesAndFit: OptionType[]
  variant: {
    color_variant: string
    price: string
    images: string[]
    size_quantity: { size: string; quantity: string }[]
  }
  date: string
  time: string
}

interface TypeProductFromBack {
  id: number
  slug: string
  sku: string
  title: string
  description: string
  recommendation: string
  gender: string
  for_kids: boolean
  price_from: string
  discount: number | string
  category: TypeCategory
  country: string
  tags: TypeProductTag[]
  specifications: TypeSpecification[]
  shop: TypeShop
  publish_date: string
  status: string
  created_at: string
  updated_at: string
  variants: TypeVariants
  reviews: TypeProductReview[]
  rating: number
  quantity: number
}

interface TypeProduct {
  id?: number
  slug?: string
  sku?: string
  title: string
  description: string
  recommendation: string
  gender: string
  for_kids: boolean
  price_from: string
  discount: number | string
  category: number | string
  country: string
  tags: string[]
  specifications: TypeSpecification[]
  shop?: TypeShop
  publish_date?: string
  status?: string
  created_at?: string
  updated_at?: string
  variants: TypeVariants
  reviews?: TypeProductReview[]
  rating?: number
  pre_order_days: string | number
  is_pre_order: boolean
}

interface TypeCategory {
  id?: number
  slug?: string
  title: string
  image: string
  parent?: number
  children?: unknown[]
}

interface TypeSpecification {
  title: string
  value: string
}

interface TypeShop {
  id: number
  slug: string
  logo: string
  title: string
  description: string
  seller: number
  status: string
  site_link: string
  instagram_link: string
  whats_app_link: string
  branches: string[]
}

interface TypeVariant {
  index?: number
  id?: number
  slug?: string
  product?: number
  title: string
  description: string
  size_variants: TypeSizeQuantity[]
  images: TypeImageFile[]
  image_main?: string
  price_min?: number
  price_max?: number
  sum_size_quantities?: number
  is_main: boolean
}

type TypeVariants = TypeVariant[]

interface TypeSizeQuantity {
  size: string
  price?: string | number | null
  quantity: number | string
}

interface TypeImage {
  id?: number
  variant?: number
  image: File
  is_main: boolean
}

interface TypeImageFile {
  id?: number
  index?: number
  is_main: boolean
  image:
    | string
    | {
        fileName?: string
        base64?: string
      }
}

interface TypeProductTag {
  id: number
  slug: string
  title: string
}

interface TypeProductReview {
  id: number
  product: number
  star: number
  review: string
  customer: TypeCustomer
}

interface TypeCustomer {
  id: number
  user: number
  date_of_birth: string
  preferences: Preference[]
}

type Preference = 'MALE' | 'FEMALE' | 'BABY' | ''
type TypeGender = 'MALE' | 'FEMALE' | 'UNISEX' | ''
type TypeStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVE' | 'DRAFT' | ''

interface TypeProductFilters {
  category: string
  color: string
  size: string
  gender: TypeGender
  status: TypeStatus
  limit?: number
  search?: string
  offset?: number
}

export type {
  TypeProductFilters,
  TypeProductFromBack,
  TypeImageFile,
  TypeSpecification,
  TypeCategory,
  TypeVariants,
  TypeProductTag,
  TypeImage,
  TypeProduct,
  TypeSizeQuantity,
  TypeVariant,
  TypeAddressData,
  TypeSellerInfoData,
  OptionType,
  CreateProductState,
}
