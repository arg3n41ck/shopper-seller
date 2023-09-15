import React, { FC, ReactNode, useCallback, useState } from 'react'
import LKSellerHeader from '@/components/headers/lkSellerHeader'
import LKSellerSideBar from '@/components/sideBars/lkSellerSideBar'
import { AuthClient } from '@/shared/apis/authClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_AUTH } from '@/shared/routes/paths'
import { fetchMe, logOut } from '@/shared/store/slices/user'
import { useRouter } from 'next/router'
import {
	HeaderAndOutletWrapper,
	LkSellerSideBarContainer,
	OutletWrapper,
	Wrapper,
} from './styles'

const authClient = new AuthClient()

interface LKSellerLayoutProps {
	children: ReactNode
}

const LKSellerLayout: FC<LKSellerLayoutProps> = ({ children }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [openMenu, setOpenMenu] = useState<boolean>(true)
	const { user } = useAppSelector(state => state.user)

	const menuHandler = (): void => {
		setOpenMenu(prev => !prev)
	}

	const checkUser = useCallback(async () => {
		if (!user) {
			const { payload } = await dispatch(fetchMe())
			if (payload?.user_type !== 'seller') {
				await authClient.logOut({ user_id: payload.id })
				router.push({ pathname: PATH_AUTH.root })
				dispatch(logOut())
			}
		}
	}, [user])

	// useEffect(() => {
	//   checkUser();
	// }, []);

	return (
		<Wrapper open={openMenu}>
			<LkSellerSideBarContainer>
				<LKSellerSideBar open={openMenu} menuHandler={menuHandler} />
			</LkSellerSideBarContainer>
			<HeaderAndOutletWrapper>
				<LKSellerHeader />
				<OutletWrapper>{children}</OutletWrapper>
			</HeaderAndOutletWrapper>
		</Wrapper>
	)
}

export default LKSellerLayout
