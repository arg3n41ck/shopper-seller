import React, { FC, useState } from 'react'
import LKSellerLayout from '@/components/layouts/lkSellerLayout'
import { BUTTON_STYLES } from '@/shared/lib/consts/styles'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { ButtonInfoCont } from '@/shared/styles/styles'
import Button from '@/shared/ui/button'
import { Edit2, Lock, Mail, Phone } from 'react-feather'
import { HeadTextOfPage, LKSellerContainerWithBackground } from '../../styles'
import {
	ChangeDataCont,
	ChangeInfoCont,
	FieldInfoText,
	FieldNameText,
	HeaderNameText,
	HeaderTextsCont,
	HeaderTitleText,
	IconAndInfoCont,
	LKSellerSettingsCont,
	Line,
	NameFieldAndInfoCont,
} from './styles'
import { EditPhoneNumberModal } from './modals/editPhoneNumberModal'
import { EditEmailModal } from './modals/editEmailModal'
import { EditPasswordModal } from './modals/editPasswordModal'

export const SettingsPage: FC = () => {
	const { user } = useAppSelector(state => state.user)
	const [showModal, setShowModal] = useState({
		phone_number: false,
		email: false,
		password: false,
	})

	const handleOpenAndCloseModal = (show: keyof typeof showModal) => {
		setShowModal(prev => ({ ...prev, [show]: !prev[show] }))
	}

	return (
		<LKSellerLayout>
			<LKSellerContainerWithBackground>
				<LKSellerSettingsCont>
					<HeadTextOfPage>Настройки</HeadTextOfPage>

					<HeaderTextsCont className={'mt-5 mb-[49px]'}>
						<HeaderTitleText>Имя</HeaderTitleText>
						<HeaderNameText>Акылбек Заманов</HeaderNameText>
					</HeaderTextsCont>

					<ChangeDataCont>
						<Line />

						<ChangeInfoCont>
							<IconAndInfoCont>
								<Phone size={54} />
								<NameFieldAndInfoCont>
									<FieldNameText>Номер телефона</FieldNameText>
									+996755892659
									{/* {!user?.email ? (
										<Skeleton />
									) : (
										<FieldInfoText>{user?.email}</FieldInfoText>
									)} */}
								</NameFieldAndInfoCont>
							</IconAndInfoCont>
							<Button
								variant={BUTTON_STYLES.withoutBackground}
								size='small'
								className={'max-w-[164px]'}
							>
								<ButtonInfoCont
									onClick={() => handleOpenAndCloseModal('phone_number')}
								>
									Изменить
									<Edit2 size={24} />
								</ButtonInfoCont>
							</Button>
						</ChangeInfoCont>

						<Line />

						<ChangeInfoCont>
							<IconAndInfoCont>
								<Mail size={54} />
								<NameFieldAndInfoCont>
									<FieldNameText>Эл. Почта</FieldNameText>
									nikekg@info.kg
									{/* {!user?.email ? (
										<Skeleton />
									) : (
										<FieldInfoText>{user?.email}</FieldInfoText>
									)} */}
								</NameFieldAndInfoCont>
							</IconAndInfoCont>
							<Button
								variant={BUTTON_STYLES.withoutBackground}
								size='small'
								className={'max-w-[164px]'}
							>
								<ButtonInfoCont
									onClick={() => handleOpenAndCloseModal('email')}
								>
									Изменить
									<Edit2 size={24} />
								</ButtonInfoCont>
							</Button>
						</ChangeInfoCont>

						<Line />

						<ChangeInfoCont>
							<IconAndInfoCont>
								<Lock size={54} />
								<NameFieldAndInfoCont>
									<FieldNameText>Пароль</FieldNameText>
									<FieldInfoText>**********</FieldInfoText>
								</NameFieldAndInfoCont>
							</IconAndInfoCont>
							<Button
								variant={BUTTON_STYLES.withoutBackground}
								size='small'
								className={'max-w-[164px]'}
							>
								<ButtonInfoCont
									onClick={() => handleOpenAndCloseModal('password')}
								>
									Изменить
									<Edit2 size={24} />
								</ButtonInfoCont>
							</Button>
						</ChangeInfoCont>

						<Line />
					</ChangeDataCont>
				</LKSellerSettingsCont>
			</LKSellerContainerWithBackground>

			{/* //? Modals */}

			{showModal.phone_number && (
				<EditPhoneNumberModal
					open={showModal.phone_number}
					onClose={() => handleOpenAndCloseModal('phone_number')}
				/>
			)}

			{showModal.email && (
				<EditEmailModal
					open={showModal.email}
					onClose={() => handleOpenAndCloseModal('email')}
				/>
			)}

			{showModal.password && (
				<EditPasswordModal
					open={showModal.password}
					onClose={() => handleOpenAndCloseModal('password')}
				/>
			)}
		</LKSellerLayout>
	)
}
