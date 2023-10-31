import React, { ChangeEvent, FC, useState } from 'react'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { ChevronDown, ChevronLeft, ChevronRight, PlusSquare, Search, X } from 'react-feather'
import { Product } from '@/shared/api/gen'
import { PATH_LK_SELLER, PATH_LK_SELLER_CREATE_PRODUCT } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import TextField from '@/shared/ui/inputs/textField'
import { ProductTable } from '@/feautures/product'
import Image from 'next/image'
import CustomSelect from '@/shared/ui/selects/default'
import cn from 'classnames'

const columns = [
  { title: 'Название товара', value: 'title' },
  { title: 'Дата добавления', value: 'publish_date' },
  { title: 'Цена', value: 'price_from' },
  { title: 'Статус', value: 'status' },
]

interface MyProductsPageProps {
  products: Product[] | undefined
}

export const MyProductsMainSection: FC<MyProductsPageProps> = ({ products }) => {
  const router = useRouter()
  const [searchProduct, setSearchProduct] = useState('')
  const handleChange = (value: string) => setSearchProduct(value)
  const [isFilter, setIsFilter] = useState(false)

  const handleShowFilter = () => setIsFilter((prev) => !prev)

  const navigateToCreateProduct = () => router.push({ pathname: PATH_LK_SELLER_CREATE_PRODUCT.step1 })

  const navigateToProductDetail = (slug: string) =>
    router.push({
      pathname: `${PATH_LK_SELLER.productsList}/product-detail/${slug}`,
    })

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
                <th className="bg-neutral-50 px-5 py-3 text-left" key={index}>
                  <p className="text-[12px] font-semibold uppercase text-[#171717]">{column.title}</p>
                </th>
              ))}
            </>
          }
          tableBody={
            <>
              {isFilter && (
                <div className="flex items-center gap-5 bg-white p-5">
                  <CustomSelect
                    placeholder={'Категория'}
                    value={''}
                    options={[]}
                    onChange={() => {}}
                    fieldTitle="size"
                    fieldValue="size"
                    className={'w-max bg-white'}
                  />

                  <CustomSelect
                    placeholder={'Цвет'}
                    value={''}
                    options={[]}
                    onChange={() => {}}
                    fieldTitle="size"
                    fieldValue="size"
                    className={'w-max bg-white'}
                  />

                  <CustomSelect
                    placeholder={'Размер'}
                    value={''}
                    options={[]}
                    onChange={() => {}}
                    fieldTitle="size"
                    fieldValue="size"
                    className={'w-max bg-white'}
                  />

                  <CustomSelect
                    placeholder={'Пол'}
                    value={''}
                    options={[]}
                    onChange={() => {}}
                    fieldTitle="size"
                    fieldValue="size"
                    className={'w-max bg-white'}
                  />

                  <CustomSelect
                    placeholder={'Статус'}
                    value={''}
                    options={[]}
                    onChange={() => {}}
                    fieldTitle="size"
                    fieldValue="size"
                    className={'w-max bg-white'}
                  />
                </div>
              )}

              {/* eslint-disable-next-line */}
              {products?.map((product: any) => (
                <tr className="border-b border-t border-neutral-300 bg-white" key={product.slug}>
                  {columns.map((column, columnIndex) => (
                    <td
                      className="cursor-pointer px-3 py-5 text-left"
                      key={columnIndex}
                      onClick={() => navigateToProductDetail(product.slug)}
                    >
                      <div className="flex items-center gap-[10px]">
                        {column.value === 'title' && product?.variants[0]?.images[0]?.image && (
                          <Image
                            src={product.variants[0].images[0].image}
                            width={36}
                            height={36}
                            alt={product.title}
                            className="h-[36px] w-[36px] rounded-[36px] object-cover"
                          />
                        )}

                        <p className="">{product[column.value] || '---'}</p>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </>
          }
          tableFooter={
            <>
              <p className="text-[12px] font-semibold uppercase text-[#171717]">1-10 из 276</p>
              <div className="flex items-center gap-5">
                <ChevronLeft cursor={'pointer'} />
                <ChevronRight cursor={'pointer'} />
              </div>
            </>
          }
        />
      </div>
    </>
  )
}
