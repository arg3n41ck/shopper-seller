import React, { FC, ReactNode } from 'react'
import Header from '../../headers/authHeader'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto mt-[23px] flex min-h-[100vh] w-full max-w-[1080px] flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default MainLayout
