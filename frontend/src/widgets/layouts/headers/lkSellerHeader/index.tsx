import { useAppSelector } from '@/shared/lib/hooks/redux'
import TextField from '@/shared/ui/inputs/textField'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { Search } from 'react-feather'

export const LKSellerHeader: FC = () => {
  const [search, setSearch] = useState('')
  const { user } = useAppSelector((state) => state.user)
  const handleChange = (value: string) => setSearch(value)

  return (
    <div className="flex w-full items-center justify-between gap-[20px]">
      <TextField
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
        placeholder={'Поиск'}
        endAdornment={<Search className="cursor-pointer text-neutral-400" />}
      />
      <div className="flex w-full items-center justify-end gap-[20px]">
        <div className="flex flex-col gap-1">
          <p className="text-18px font-[500] text-neutral-900">Nike Kyrgyzstan</p>
          {/* {!user?.seller ? (
						<Skeleton />
					) : (
						<ShopNameOfSeller>{user?.seller.shop_name}</ShopNameOfSeller>
					)} */}

          <p className="text-[13.33px] font-[400] text-neutral-500">nikekg@info.kg</p>

          {/* {!user?.seller ? (
						<Skeleton />
					) : (
						<EmailOfSeller>{user?.email}</EmailOfSeller>
					)} */}
        </div>
        <div className="h-[43px] w-[43px] cursor-pointer">
          {/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
          <Image src={'/dog.jpg'} alt="dog" width={43} height={43} className="h-full rounded-[50%]" />
        </div>
      </div>
    </div>
  )
}
