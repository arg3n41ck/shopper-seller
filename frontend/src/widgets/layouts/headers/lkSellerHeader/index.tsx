import { FC } from 'react'
import Image from 'next/image'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/shared/ui/loaders'

const sellerClient = new SellerClient()

export const LKSellerHeader: FC = () => {
  const { data: user } = useQuery(['me'], sellerClient.fetchMe)
  const { data: shop } = useQuery(['shop'], sellerClient.fetchShop)

  return (
    <div className="flex w-full items-center justify-between gap-[20px]">
      <div className="flex w-full items-center justify-end gap-[20px]">
        <div className="flex flex-col gap-1">
          {!shop?.title ? (
            <Skeleton className="h-[24px]" />
          ) : (
            <p className="text-18px font-[500] text-neutral-900">{shop.title}</p>
          )}

          {!user?.email ? (
            <Skeleton className="h-[24px]" />
          ) : (
            <p className="text-[13.33px] font-[400] text-neutral-500">{user?.email}</p>
          )}
        </div>
        <div className="h-[43px] w-[43px] cursor-pointer">
          {/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
          <Image
            src={'/public/images/mock/child.png'}
            alt="dog"
            width={43}
            height={43}
            className="h-full rounded-[50%]"
          />
        </div>
      </div>
    </div>
  )
}
