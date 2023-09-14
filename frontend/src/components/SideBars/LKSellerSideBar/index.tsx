import LogoIcon from '@/assets/icons/svg/LogoIcon'
import { AuthClient } from '@/shared/apis/authClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { TypeLogOut } from '@/shared/lib/types/authTypes'
import { PATH_AUTH } from '@/shared/routes/paths'
import { logOut } from '@/shared/store/slices/user'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import {
	Clipboard,
	Folder,
	Home,
	List,
	LogOut,
	Menu,
	Settings,
	Users,
} from 'react-feather'
import {
	ListBlock,
	LogoCont,
	LogoInfoCont,
	MenuCont,
	SideBarRouter,
	WrapperSideBar,
} from './styles'

interface Props {
	open: boolean
	menuHandler: () => void
}

interface RouterRef {
	name: string
	path: string
	icon: JSX.Element
	active?: boolean
}

const authClient = new AuthClient()

const variantsSidebar = {
	open: { width: 312 },
	closed: { width: 75 },
}

const transitionForAnimate = { type: 'spring', stiffness: 400, damping: 30 }

const LKSellerSideBar: FC<Props> = ({ open, menuHandler }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const matchMyProducts = router.pathname.match(/\/lk-seller\/products-list/i)
	const isOpen = open ? 'open' : 'closed'

	const { user } = useAppSelector(state => state.user)

	const routersRef = useMemo<RouterRef[]>(
		() => [
			{
				name: 'Главная',
				path: '/lk-seller',
				icon: <Home />,
			},
			{
				name: 'Список продуков',
				path: '/lk-seller/products-list',
				icon: <List />,
				active: !!matchMyProducts?.length,
			},
			{
				name: 'История заказов',
				path: '/lk-seller/order-history',
				icon: <Folder />,
			},
			{
				name: 'О магазине',
				path: '/lk-seller/about-shop',
				icon: <Clipboard />,
			},

			{
				name: 'Архив',
				path: '/lk-seller/archive',
				icon: <Users />,
			},
			{
				name: 'Настройки',
				path: '/lk-seller/settings',
				icon: <Settings />,
			},
		],
		[router.pathname]
	)

	const handleLogOutClick = async ({ user_id }: TypeLogOut) => {
		await authClient.logOut({ user_id })
		dispatch(logOut())
		router.push({ pathname: PATH_AUTH.root })
	}

	return (
		<>
			<WrapperSideBar
				animate={isOpen}
				transition={transitionForAnimate}
				variants={variantsSidebar}
				open={open}
			>
				<LogoCont>
					<LogoInfoCont>
						{open && <LogoIcon />}

						<MenuCont onClick={menuHandler}>{<Menu />}</MenuCont>
					</LogoInfoCont>
				</LogoCont>
				<ListBlock
					open={open}
					animate={isOpen}
					variants={variantsSidebar}
					transition={transitionForAnimate}
				>
					{routersRef.map((item: RouterRef) => {
						return (
							<SideBarRouter
								onClick={() => router.push({ pathname: item.path })}
								$active={item.active || router.pathname === item.path}
								key={item.name}
								open={open}
							>
								<div className={'router_info'}>
									{item.icon}
									{open && <p>{item.name}</p>}
								</div>
							</SideBarRouter>
						)
					})}
					<SideBarRouter
						onClick={() => handleLogOutClick({ user_id: user?.id })}
						open={open}
						className={'logOut'}
					>
						<div className={'router_info logOut-text'}>
							<LogOut />
							{open && <p>Выйти</p>}
						</div>
					</SideBarRouter>
				</ListBlock>
			</WrapperSideBar>
		</>
	)
}

export default LKSellerSideBar
