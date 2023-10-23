import React, { useCallback, useEffect, useState } from 'react'
import { SellerClient } from '@/shared/apis/sellerClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { TypeAddressData } from '@/shared/lib/types/sellerTypes'
import { fetchSeller } from '@/entities/seller/model/slice'
import { TextArea } from '@/shared/ui/inputs/textArea'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const sellerClient = new SellerClient()

const createAddressDefaultForm = {
  id: 'create-address',
  address: '',
  phone_number: '',
}

export const AboutShopMainSection = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { seller, branches } = useAppSelector((state) => state.seller)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [selectedAddress, setSelectedAddress] = useState<string[]>([])
  const [showAddAddress, setShowAddAddress] = useState(false)

  const handleCloseModal = () => setShowEditModal((prev) => !prev)
  const handleCloseAddress = () => setShowAddAddress((prev) => !prev)

  const handleOpenEditAddress = (id: string) => {
    if (!selectedAddress.includes(id)) {
      setSelectedAddress((prev: string[]) => [...prev, id])
      createAddressDefaultForm.id === id && handleCloseAddress()
    }
  }

  const handleCloseEditAddress = useCallback(
    (id: string) => {
      setSelectedAddress((prev) => prev.filter((address: string) => address !== id))
      createAddressDefaultForm.id === id && handleCloseAddress()
    },
    [selectedAddress],
  )

  const postNewAddress = async (value: TypeAddressData) => {
    await sellerClient.createAddress(value)
  }

  const editAddress = async (value: TypeAddressData) => {
    await sellerClient.editAddress(value)
  }

  const deleteAddress = async (id: string) => {
    await sellerClient.deleteAddress(id).then(() => toast.success('Вы успешно удалили филиал'))
  }

  useEffect(() => {
    dispatch(fetchSeller((query?.slug as string) || ''))
  }, [query])

  return (
    <>
      <div className="relative h-full bg-none">
        <div className="px-[24px] py-[28px]">
          <div className="mb-[35px] flex flex-col gap-[30px]">
            <p className="text-[28px] font-[600] text-neutral-900">Мой магазин</p>

            <div>
              <div className="flex items-start gap-[25px]">
                <div className="h-[95px] w-[95px] cursor-pointer">
                  {/* <Skeleton height={'100%'} width={'100%'} border={'50%'} /> */}
                  <Image
                    src={'/dog.jpg'}
                    alt="dog"
                    className="h-full rounded-[50%]"
                    width={95}
                    height={95}
                    objectFit="cover"
                    layout=""
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
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
                  <p className="text-[28px] font-[600] text-neutral-900">ARGOPSHOPPER</p>
                  <p className="text-[16px] font-[400] text-neutral-400">argenshopper@gmail.com</p>
                </div>
              </div>
              <p className="mt-3 cursor-pointer font-[400] text-gray">Редактировать</p>
            </div>

            <div>
              <p className="text-[18px] font-[400] text-neutral-900">Информация о магазине</p>

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
                name=""
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
          </div>
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
        </div>
      </div>

      {/* {showEditModal && (
				<EditShopInfoModal open={showEditModal} onClose={handleCloseModal} />
			)} */}
    </>
  )
}
