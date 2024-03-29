import React, { FC, useMemo, useState } from 'react'
import LogoIcon from '@/shared/assets/icons/LogoIcon'
import { PATH_AUTH } from '@/shared/config'
import { useRouter } from 'next/router'
import { Clipboard, Folder, Home, List, LogOut, Menu, Settings } from 'react-feather'
import { motion } from 'framer-motion'
import cn from 'classnames'
import LogOutBackdrop from './logOutModal'
import { removeFieldsFromLocalStorage } from '@/shared/lib/hooks/useLocalStorage'
import { handleApiError } from '@/shared/lib/helpers'
import { useQueryClient } from '@tanstack/react-query'

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

const variantsSidebar = {
  open: { width: 312 },
  closed: { width: 75 },
}

const transitionForAnimate = { type: 'spring', stiffness: 400, damping: 30 }

export const LKSellerSideBar: FC<Props> = ({ open, menuHandler }) => {
  const router = useRouter()
  const matchMyProducts = router.pathname.match(/\/lk-seller\/products-list/i)
  const isOpen = open ? 'open' : 'closed'
  const [isLogOut, setIsLogOut] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const handleShowLogOutBackdrop = () => setIsLogOut((prev) => !prev)

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
        name: 'Настройки',
        path: '/lk-seller/settings',
        icon: <Settings />,
      },
    ],
    [router.pathname],
  )

  const handleLogOutClick = async () => {
    try {
      await removeFieldsFromLocalStorage(['access_token', 'refresh_token'])
      await queryClient.clear()
      await router.push({ pathname: PATH_AUTH.logIn })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } catch (error: AxiosError) {
      handleApiError(error)
    }
  }

  return (
    <>
      <motion.div
        className="fixed flex h-full flex-col gap-[40px] bg-white"
        animate={isOpen}
        transition={transitionForAnimate}
        variants={variantsSidebar}
      >
        <div className="max-w-[312px] bg-white px-[24px] py-[15px]">
          <div className="flex h-[50px] w-full items-center justify-between">
            {open && <LogoIcon />}

            <div className="cursor-pointer" onClick={menuHandler}>
              {<Menu />}
            </div>
          </div>
        </div>
        <motion.ul
          className={`max-w-[${open ? 283 : 60}px] grid grid-cols-1`}
          animate={isOpen}
          variants={variantsSidebar}
          transition={transitionForAnimate}
        >
          {routersRef.map((item: RouterRef) => {
            return (
              <li
                className={cn(
                  `
                relative cursor-pointer p-[16px_16px_16px_24px] text-neutral-900 
                transition-all ease-in-out hover:bg-neutral-200 
                `,
                  {
                    ['bg-neutral-900 text-white']: item.active || router.pathname === item.path,
                  },
                )}
                onClick={() => router.push({ pathname: item.path })}
                key={item.name}
              >
                <div className="decoration-none flex gap-6 text-[16px] font-[600]">
                  {item.icon}
                  {open && <p className="whitespace-nowrap">{item.name}</p>}
                </div>
              </li>
            )
          })}
          <li
            onClick={handleShowLogOutBackdrop}
            className={`
            relative mt-[95px] cursor-pointer
            p-[16px_16px_16px_24px] text-neutral-900 transition-all ease-in-out
            hover:bg-error300 active:bg-error500 active:text-white
            `}
          >
            <div className="decoration-none flex gap-[37px] text-[16px] font-[600]">
              <LogOut />
              {open && <p className="whitespace-nowrap">Выйти</p>}
            </div>
          </li>
        </motion.ul>
      </motion.div>

      <LogOutBackdrop open={isLogOut} onClose={handleShowLogOutBackdrop} logOut={handleLogOutClick} />
    </>
  )
}
