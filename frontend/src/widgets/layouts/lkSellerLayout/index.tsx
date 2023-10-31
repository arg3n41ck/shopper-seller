import React, { FC, ReactNode, useState } from 'react'
import { LKSellerHeader } from '@/widgets/layouts/headers'
import { LKSellerSideBar } from '@/shared/ui/sideBars'
import { motion } from 'framer-motion'

interface LKSellerLayoutProps {
  children: ReactNode
}

export const LKSellerLayout: FC<LKSellerLayoutProps> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(true)

  const menuHandler = (): void => {
    setOpenMenu((prev) => !prev)
  }

  return (
    <motion.div
      transition={{ duration: '0.1s' }}
      style={{ gridTemplateColumns: `${openMenu ? 312 : 75}px 1fr` }}
      className="transition-duration grid min-h-[100vh]  transition-all ease-in-out"
    >
      <div>
        <LKSellerSideBar open={openMenu} menuHandler={menuHandler} />
      </div>
      <div className="mx-[23px] my-[15px] flex flex-col gap-[20px]">
        <LKSellerHeader />
        <div className="h-full py-6">{children}</div>
      </div>
    </motion.div>
  )
}
