import React, { ChangeEvent, FC, useState } from 'react'
import { BUTTON_STYLES, PRIMARY } from '@/shared/lib/consts/styles'
import { useRouter } from 'next/router'
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Search, X } from 'react-feather'
import { PATH_LK_SELLER } from '@/shared/config'
import { Button } from '@/shared/ui/buttons'
import TextField from '@/shared/ui/inputs/textField'
import { ProductTable } from '@/feautures/product'
import cn from 'classnames'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '@/shared/lib/hooks/useDebounce'
import { format, parseISO } from 'date-fns'
import { Order } from '@/shared/api/gen'
import { CustomPopup, Statuses, CustomSelect, FilterTag } from '@/shared/ui'
import Image from 'next/image'
import { statuses } from '@/shared/lib/consts/globals'

interface Column {
  title: string
  value: OrderKey
}

type OrderKey = 'order_id' | 'created_at' | 'full_name' | 'quantity' | 'status'

const columns: Column[] = [
  { title: 'ID заказа', value: 'order_id' },
  { title: 'Дата и время', value: 'created_at' },
  { title: 'Заказчик', value: 'full_name' },
  { title: 'Кол-во товаров', value: 'quantity' },
  { title: 'Статус', value: 'status' },
]

const sellerClient = new SellerClient()

export const OrdersHistoryMainSection: FC = () => {
  const router = useRouter()
  const [searchOrder, setSearchOrder] = useState('')
  const handleChange = (value: string) => setSearchOrder(value)
  const [isFilter, setIsFilter] = useState(false)
  const debouncedSearchTerm = useDebounce(searchOrder, 500)
  const [offset, setOffset] = useState<number>(0)
  const limit: number = 10
  const [activePopupId, setActivePopupId] = useState<number | null>(null)
  const orderStatuses = Object.values(statuses['order'])

  const togglePopup = (orderId: number) => {
    setActivePopupId((prev) => (prev === orderId ? null : orderId))
  }

  const [filters, setFilters] = useState({
    status: '',
  })

  const navigateToPath = (slug: string) => {
    router.push(`${PATH_LK_SELLER.productsList}/product-detail/${slug}`)
  }

  const getValue = (order: Order, value: OrderKey) => {
    switch (value) {
      case 'order_id':
        return (
          <div className="flex items-center gap-1">
            <p className="uppercase">#{order[value]}</p>

            <div className="text-primaryDash600">
              <ArrowUpRight size={16} />
            </div>
          </div>
        )
      case 'created_at':
        return format(parseISO(order[value] || ''), 'dd.MM.yyyy HH:mm')
      case 'status':
        return <Statuses type="order" status={order[value]} />
      case 'quantity':
        return (
          <div>
            <div onClick={() => order?.id && togglePopup(order.id)} className="flex items-center gap-[10px]">
              <p>{order.items.length} товара</p>
              <ChevronDown size={16} color={PRIMARY.dashboard[600]} />
            </div>

            {activePopupId === order.id && (
              <CustomPopup isVisible={activePopupId === order.id} onClose={() => setActivePopupId(null)}>
                <div className="flex flex-col gap-5">
                  {order.items.map((product) => (
                    <div className="inline-flex items-start justify-start gap-3" key={product.id}>
                      <Image
                        className="relative"
                        width={40}
                        height={40}
                        src={
                          product?.product_variant?.image_main ||
                          product?.product_variant?.images?.[0]?.image ||
                          '/images/mock/child.png'
                        }
                        alt={product.product_variant.title || 'Product image'}
                        onClick={() => navigateToPath(product.product_slug)}
                      />

                      <div className="flex items-start justify-start gap-14">
                        <div className="inline-flex flex-col items-start justify-start">
                          <p
                            className="text-xs font-medium text-neutral-900"
                            onClick={() => navigateToPath(product.product_slug)}
                          >
                            {product.product_title || ''}
                          </p>

                          <p className="text-xs font-normal text-stone-500">
                            {product.product_description}, {product.size}
                          </p>

                          <p className="text-xs font-normal text-stone-500">{product.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomPopup>
            )}
          </div>
        )
      default:
        return order[value] || '---'
    }
  }

  const { data } = useQuery(['orders', filters, debouncedSearchTerm, offset], () =>
    sellerClient.fetchOrders({
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

  const removeFilter = (key: string) => {
    setFilters({ ...filters, [key]: '' })
  }

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
  }

  const handleShowFilter = () => setIsFilter((prev) => !prev)

  const navigateToOrderDetail = (id: number) =>
    router.push({
      pathname: `${PATH_LK_SELLER.orderHistory}/detail/${id}`,
    })
  return (
    <>
      <div className="relative h-full bg-none">
        <p className="text-[23px] font-semibold text-black">История заказов</p>

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
              value={searchOrder}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
              placeholder={'Поиск по названию и ID'}
              startAdornment={<Search />}
              className="max-w-[297px]"
            />
          </div>
        </div>

        <ProductTable
          tableHeader={
            <>
              {columns.map((column, index) => (
                <th className="bg-neutral-50 px-3 py-3 text-left" key={index}>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[#171717]">{column.title}</p>
                </th>
              ))}
            </>
          }
          tableBody={
            <>
              {isFilter && (
                <tr>
                  <td colSpan={columns.length} className="bg-white">
                    <div className="flex flex-col gap-5 p-5">
                      <div className="flex items-center gap-5 bg-white">
                        <CustomSelect
                          placeholder={'Статус'}
                          value={filters.status}
                          options={orderStatuses}
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
              {data?.results?.map((order: any) => (
                <tr className="border-b border-t border-neutral-300 bg-white" key={order.id}>
                  {columns.map((column, columnIndex) => (
                    <td className="px-3 py-5 text-left" key={columnIndex}>
                      <div
                        className="flex cursor-pointer items-center gap-[10px] text-xs font-medium tracking-wide"
                        onClick={() => column.value === 'order_id' && navigateToOrderDetail(order.id)}
                      >
                        {getValue(order, column.value)}
                      </div>
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
