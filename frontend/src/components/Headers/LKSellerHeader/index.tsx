import Skeleton from '@/components/Skeleton'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import TextField from '@/shared/ui/textField'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import {
	Avatar,
	EmailOfSeller,
	LKSellerHeaderCont,
	LKSellerHeaderUserInfo,
	SearchIcon,
	ShopNameOfSeller,
	UseInfoCont,
} from './styles'

const LKSellerHeader: FC = () => {
	const [search, setSearch] = useState('')
	const { user } = useAppSelector(state => state.user)
	const handleChange = (value: string) => setSearch(value)

	return (
		<LKSellerHeaderCont>
			<TextField
				value={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleChange(e.target.value)
				}
				placeholder={'Поиск'}
				endAdornment={<SearchIcon />}
			/>
			<LKSellerHeaderUserInfo>
				<UseInfoCont className={'flex flex-col gap-1'}>
					{!user?.seller ? (
						<Skeleton />
					) : (
						<ShopNameOfSeller>{user?.seller.shop_name}</ShopNameOfSeller>
					)}
					{!user?.seller ? (
						<Skeleton />
					) : (
						<EmailOfSeller>{user?.email}</EmailOfSeller>
					)}
				</UseInfoCont>
				<Avatar>
					{/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
					<Image src={'/dog.jpg'} alt='dog' width={42} height={42} />
				</Avatar>
			</LKSellerHeaderUserInfo>
		</LKSellerHeaderCont>
	)
}

export default LKSellerHeader
