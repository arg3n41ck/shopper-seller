import React, { FC, ReactNode, useCallback, useState } from 'react'
import LKSellerHeader from '@/components/headers/lkSellerHeader'
import LKSellerSideBar from '@/components/sideBars/lkSellerSideBar'
import { AuthClient } from '@/shared/apis/authClient'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { PATH_AUTH } from '@/shared/routes/paths'
import { fetchMe, logOut } from '@/shared/store/slices/user'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const authClient = new AuthClient()

interface LKSellerLayoutProps {
  children: ReactNode
}

const LKSellerLayout: FC<LKSellerLayoutProps> = ({ children }) => {
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
        await authClient.logOut({ user_id: payload.id })
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

export default LKSellerLayout
