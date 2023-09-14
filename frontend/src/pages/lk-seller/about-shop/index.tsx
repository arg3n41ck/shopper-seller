import LKSellerLayout from '@/components/Layouts/LKSellerLayout'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { TypeAddressData } from '@/shared/lib/types/sellerTypes'
import { fetchBranches, fetchSeller } from '@/shared/store/slices/seller'
import { TextArea } from '@/shared/ui/textArea'
import Image from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { HeadTextOfPage, LKSellerContainerWithBackground } from '../styles'
import {
	AboutShopContainer,
	Avatar,
	InfoAboutShopText,
	ShopEditText,
	ShopEmailText,
	ShopHeaderInfo,
	ShopInfo,
	ShopNameAndEmailContainer,
	ShopNameText,
} from './styles'

const sellerClient = new SellerClient()

const createAddressDefaultForm = {
	id: 'create-address',
	address: '',
	phone_number: '',
}

const AboutShop: FC = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.user)
	const { seller, branches } = useAppSelector(state => state.seller)
	const [showEditModal, setShowEditModal] = useState<boolean>(false)
	const [selectedAddress, setSelectedAddress] = useState<string[]>([])
	const [showAddAddress, setShowAddAddress] = useState(false)

	const handleCloseModal = () => setShowEditModal(prev => !prev)
	const handleCloseAddress = () => setShowAddAddress(prev => !prev)

	const handleOpenEditAddress = (id: string) => {
		if (!selectedAddress.includes(id)) {
			setSelectedAddress((prev: string[]) => [...prev, id])
			createAddressDefaultForm.id === id && handleCloseAddress()
		}
	}

	const handleCloseEditAddress = useCallback(
		(id: string) => {
			setSelectedAddress(prev =>
				prev.filter((address: string) => address !== id)
			)
			createAddressDefaultForm.id === id && handleCloseAddress()
		},
		[selectedAddress]
	)

	const postNewAddress = async (value: TypeAddressData) => {
		await sellerClient.createAddress(value)
	}

	const editAddress = async (value: TypeAddressData) => {
		await sellerClient.editAddress(value)
	}

	const deleteAddress = async (id: string) => {
		await sellerClient
			.deleteAddress(id)
			.then(() => toast.success('Вы успешно удалили филиал'))
		await dispatch(fetchBranches())
	}

	useEffect(() => {
		dispatch(fetchSeller())
		dispatch(fetchBranches())
	}, [])

	return (
		<LKSellerLayout>
			<LKSellerContainerWithBackground>
				<AboutShopContainer>
					<ShopInfo>
						<HeadTextOfPage>Мой магазин</HeadTextOfPage>

						<div>
							<ShopHeaderInfo>
								<Avatar>
									{/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
									<Image
										src={'/dog.jpg'}
										alt='dog'
										width={95}
										height={95}
										objectFit='cover'
										layout=''
									/>
								</Avatar>
								<ShopNameAndEmailContainer>
									{/* {!user ? (
									<Skeleton height='38px' />
								) : (
									<ShopNameText>{user?.seller?.shop_name}</ShopNameText>
								)}
								{!user ? (
									<Skeleton height='19px' />
								) : (
									<ShopEmailText>{user?.email}</ShopEmailText>
								)} */}
									<ShopNameText>ARGOPSHOPPER</ShopNameText>
									<ShopEmailText>argenshopper@gmail.com</ShopEmailText>
								</ShopNameAndEmailContainer>
							</ShopHeaderInfo>

							<ShopEditText className={'mt-3'}>Редактировать</ShopEditText>
						</div>

						<div>
							<InfoAboutShopText>Информация о магазине</InfoAboutShopText>

							<TextArea
								value={''}
								// error={
								// 	formik.touched.description &&
								// 	Boolean(formik.errors.description)
								// }
								// errorMessage={
								// 	formik.touched.description ? formik.errors.description : ''
								// }
								onChange={() => console.log('it works')}
								placeholder={t('Описание магазина')}
								name=''
								className={'mt-5 max-w-[528px]'}
							/>
						</div>
						{/* <IconAndInfoContainer>
							<Clipboard size={54} />

							<ShopEditInfo>
								<ShopFieldsInfo>
									<FieldsCont>
										<FieldName>Название магазина</FieldName>
										{!seller?.shop_name ? (
											<Skeleton />
										) : (
											<FieldInfo>{seller?.shop_name}</FieldInfo>
										)}
									</FieldsCont>

									{!!seller?.site && (
										<FieldsCont>
											<FieldName>Сайт магазина</FieldName>
											<FieldInfo>{truncateText(seller.site, 20)}</FieldInfo>
										</FieldsCont>
									)}

									{!!seller?.instagram && (
										<FieldsCont>
											<FieldName>Instagram</FieldName>
											<FieldInfo>
												{truncateText(seller.instagram, 20)}
											</FieldInfo>
										</FieldsCont>
									)}
								</ShopFieldsInfo>

								<Button
									onClick={handleCloseModal}
									variant='secondary-cta-indigo'
								>
									<ButtonInfoCont>
										Изменить
										<Edit2 />
									</ButtonInfoCont>
								</Button>
							</ShopEditInfo>
						</IconAndInfoContainer> */}
					</ShopInfo>
					{/* <Line />
					<ShopAddressesInfoContainer>
						<IconAndInfoContainer>
							<MapPin size={54} />

							<AddressesContainer>
								{!!branches?.length &&
									branches.map((item: TypeAddressData) => (
										<AddressItem
											data={item}
											key={item.id}
											showEdit={selectedAddress.includes(item.id)}
											onOpen={handleOpenEditAddress}
											onClose={handleCloseEditAddress}
											requestAddress={editAddress}
											deleteAddress={deleteAddress}
											action='edit'
										/>
									))}

								{!showAddAddress ? (
									<AddNewAddressContainer onClick={handleCloseAddress}>
										<PlusCircle size={68} />
										<AddNewAddressText>Добавить адрес</AddNewAddressText>
									</AddNewAddressContainer>
								) : (
									<AddressItem
										data={createAddressDefaultForm}
										showEdit={showAddAddress}
										onOpen={handleOpenEditAddress}
										onClose={handleCloseEditAddress}
										requestAddress={postNewAddress}
										action='create'
									/>
								)}
							</AddressesContainer>
						</IconAndInfoContainer>
					</ShopAddressesInfoContainer>
					<Line /> */}
				</AboutShopContainer>
			</LKSellerContainerWithBackground>

			{/* {showEditModal && (
				<EditShopInfoModal open={showEditModal} onClose={handleCloseModal} />
			)} */}
		</LKSellerLayout>
	)
}

export default AboutShop
