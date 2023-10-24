import React, { FC, ReactNode, useCallback, useState } from 'react'
import { LKSellerHeader } from '@/widgets/layouts/headers'
import { LKSellerSideBar } from '@/shared/ui/sideBars'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_AUTH } from '@/shared/config'
import { fetchMe, logOut } from '@/entities/user/model/slice'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { $apiAccountsApi } from '@/shared/api'

interface LKSellerLayoutProps {
  children: ReactNode
}

export const LKSellerLayout: FC<LKSellerLayoutProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [openMenu, setOpenMenu] = useState<boolean>(true)
  const { user } = useAppSelector((state) => state.user)

  const menuHandler = (): void => {
    setOpenMenu((prev) => !prev)
  }

  const checkUser = useCallback(async () => {
    if (!user) {
      const { payload } = await dispatch(fetchMe())
      if (payload?.user_type !== 'seller') {
        await $apiAccountsApi.accountsAuthTokenLogoutCreate()
        await router.push({ pathname: PATH_AUTH.root })
        dispatch(logOut())
      }
    }
  }, [user])

  // useEffect(() => {
  //   checkUser();
  // }, []);

  return (
    <motion.div
      transition={{ duration: '0.1s' }}
      style={{ gridTemplateColumns: `${openMenu ? 312 : 75}px 1fr` }}
      className="transition-duration grid min-h-[100vh] transition-all ease-in-out"
    >
      <div>
        <LKSellerSideBar open={openMenu} menuHandler={menuHandler} />
      </div>
      <div className="mx-[23px] my-[15px] flex flex-col gap-[20px]">
        <LKSellerHeader />
        <div className="h-full">{children}</div>
      </div>
    </motion.div>
  )
}
