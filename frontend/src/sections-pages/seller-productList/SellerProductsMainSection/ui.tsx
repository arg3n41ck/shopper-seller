import React, { ChangeEvent, FC, useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { ChevronDown, ChevronLeft, ChevronRight, PlusSquare, Search, X } from 'react-feather'
import { PATH_LK_SELLER, PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import TextField from '@/shared/ui/inputs/textField'
import { ProductTable } from '@/feautures/product'
import Image from 'next/image'
import cn from 'classnames'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '@/shared/lib/hooks/useDebounce'
import { TypeProductFilters } from '@/shared/lib/types/sellerTypes'
import { CustomSelectHover } from '@/shared/ui/selects/default/CustomSelectHover'
import { Product } from '@/shared/api/gen'
import { CustomSelect, FilterTag, Statuses } from '@/shared/ui'
import { format, parseISO } from 'date-fns'
import { genders, statuses } from '@/shared/lib/consts/globals'

type ProductKey = 'title' | 'created_at' | 'price_from' | 'status'

interface Column {
  title: string
  value: ProductKey
}

const columns: Column[] = [
  { title: 'Название товара', value: 'title' },
  { title: 'Дата добавления', value: 'created_at' },
  { title: 'Цена', value: 'price_from' },
  { title: 'Статус', value: 'status' },
]

const sellerClient = new SellerClient()

const getValue = (product: Product, value: ProductKey) => {
  switch (value) {
    case 'title':
      return (
        <div className="flex items-center gap-[10px]">
          <Image
            src={product?.variants?.[0]?.images?.[0]?.image || '/images/mock/child.png'}
            width={40}
            height={40}
            alt={product.title}
            className="h-[40px] w-[40px] object-cover"
          />

          <p className="uppercase">{product[value]}</p>
        </div>
      )
    case 'created_at':
      return <p className="uppercase">{format(parseISO(product[value] || ''), 'dd/MM/yyyy')}</p>
    case 'price_from':
      return <p className="uppercase">{Math.floor(+product[value])} сом</p>
    case 'status':
      return (
        <div className="flex flex-col items-start gap-1">
          <Statuses type="product" status={product[value]} />
          <p className="uppercase">{format(parseISO(product?.updated_at || ''), 'dd/MM/yyyy HH:mm:ss')}</p>
        </div>
      )
    default:
      return product[value] || '---'
  }
}

export const MyProductsMainSection: FC = () => {
  const router = useRouter()
  const [searchProduct, setSearchProduct] = useState('')
  const handleChange = (value: string) => setSearchProduct(value)
  const [isFilter, setIsFilter] = useState(false)
  const debouncedSearchTerm = useDebounce(searchProduct, 500)
  const [offset, setOffset] = useState<number>(0)
  const limit: number = 10
  const { data: specifications } = useQuery(['specifications'], sellerClient.fetchSpecifications)
  const { data: categories } = useQuery(['categories'], sellerClient.fetchCategories)
  const productStatuses = Object.values(statuses['product'])

  const sizesForFilter = specifications?.find((specification) => specification.slug === 'size')?.values

  const colorsForFilter = specifications?.find((specification) => specification.slug === 'color')?.values

  const [filters, setFilters] = useState<TypeProductFilters>({
    category: '',
    color: '',
    size: '',
    gender: '',
    status: '',
  })

  const { data } = useQuery(['products', filters, debouncedSearchTerm, offset], () =>
    sellerClient.fetchProducts({
      category: filters.category,
      color: filters.color,
      size: filters.size,
      gender: filters.gender,
      status: filters.status,
      limit,
      search: debouncedSearchTerm,
      offset,
    }),
  )

  const handleNextPage = () => {
    const newOffset = offset + limit
    if (data && newOffset < data.count) {
      setOffset(newOffset)
    }
  }

  const handlePreviousPage = () => {
    setOffset(Math.max(offset - limit, 0))
  }

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
  }

  const handleShowFilter = () => setIsFilter((prev) => !prev)

  const navigateToCreateProduct = () => router.push({ pathname: PATH_LK_SELLER_CREATE_PRODUCT.step1 })

  const navigateToProductDetail = (slug: string) =>
    router.push({
      pathname: `${PATH_LK_SELLER.productsList}/product-detail/${slug}`,
    })

  const removeFilter = (key: string) => {
    setFilters({ ...filters, [key]: '' })
  }

  return (
    <>
      <div className="relative h-full bg-none">
        <p className="text-[23px] font-semibold text-black">Список товаров</p>

        <div className="mt-[27px] flex items-center justify-between gap-5 border border-b-0 border-[#dbdbdb] p-5">
          <div className="flex w-full items-center gap-5">
            <Button
              variant={BUTTON_STYLES.withoutBackground}
              onClick={handleShowFilter}
              className={cn('max-w-[142px]', {
                ['!border-primaryDash600 !bg-[#4f46e51a] text-primaryDash600']: isFilter,
              })}
            >
              <div className="flex items-center gap-[10px]">
                Фильтры
                {isFilter ? <X /> : <ChevronDown />}
              </div>
            </Button>

            <TextField
              value={searchProduct}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
              placeholder={'Поиск по названию и ID'}
              startAdornment={<Search />}
              className="max-w-[297px]"
            />
          </div>

          <Button onClick={navigateToCreateProduct} variant={BUTTON_STYLES.primaryCta} className={'max-w-[182px]'}>
            <div className="flex items-center gap-[10px]">
              <PlusSquare />
              Добавить товар
            </div>
          </Button>
        </div>

        <ProductTable
          tableHeader={
            <>
              {columns.map((column, index) => (
                <th className="bg-neutral-50 px-3 py-3 text-left tracking-wide" key={index}>
                  <p className="text-[12px] font-semibold uppercase text-[#171717]">{column.title}</p>
                </th>
              ))}
            </>
          }
          tableBody={
            <>
              {isFilter && (
                <tr>
                  <td className="bg-white" colSpan={columns.length}>
                    <div className="flex flex-col gap-5 p-5">
                      <div className="flex flex-wrap items-center gap-5 bg-white">
                        <CustomSelectHover
                          value={filters.category}
                          placeholder={'Категория'}
                          options={categories}
                          onClick={(value) => handleFilterChange('category', value.slug || '')}
                        />

                        <CustomSelect
                          placeholder={'Цвет'}
                          value={filters.color}
                          options={colorsForFilter || []}
                          onChange={(value) => handleFilterChange('color', value)}
                          fieldTitle="size"
                          fieldValue="size"
                          className={'w-max bg-white'}
                        />

                        <CustomSelect
                          placeholder={'Размер'}
                          value={filters.size}
                          options={sizesForFilter || []}
                          onChange={(value) => handleFilterChange('size', value)}
                          fieldTitle="size"
                          fieldValue="size"
                          className={'w-max bg-white'}
                        />

                        <CustomSelect
                          placeholder={'Пол'}
                          value={filters.gender}
                          options={genders}
                          onChange={(value) => handleFilterChange('gender', value)}
                          fieldTitle="title"
                          fieldValue="value"
                          className={'w-max bg-white'}
                        />

                        <CustomSelect
                          placeholder={'Статус'}
                          value={filters.status}
                          options={productStatuses || []}
                          onChange={(value) => handleFilterChange('status', value)}
                          fieldTitle="title"
                          fieldValue="value"
                          className={'w-max bg-white'}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) =>
                          value ? (
                            <FilterTag key={key} label={`${key}: ${value}`} onRemove={() => removeFilter(key)} />
                          ) : null,
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              {/* eslint-disable-next-line */}
              {data?.results?.map((product: any) => (
                <tr className="border-b border-t border-neutral-300 bg-white " key={product.slug}>
                  {columns.map((column, columnIndex) => (
                    <td
                      className="cursor-pointer px-3 py-5 text-left text-xs font-medium tracking-wide"
                      key={columnIndex}
                      onClick={() => navigateToProductDetail(product.slug)}
                    >
                      {getValue(product, column.value)}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          }
          tableFooter={
            <>
              <p className="text-[12px] font-semibold uppercase text-[#171717]">
                {data ? `${offset + 1}-${Math.min(offset + limit, data.count)} из ${data.count}` : ''}
              </p>
              <div className="flex items-center gap-5">
                <ChevronLeft cursor={'pointer'} onClick={handlePreviousPage} />
                <ChevronRight cursor={'pointer'} onClick={handleNextPage} />
              </div>
            </>
          }
        />
      </div>
    </>
  )
}
