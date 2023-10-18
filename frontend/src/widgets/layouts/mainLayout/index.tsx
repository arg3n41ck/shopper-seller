import React, { ReactNode } from 'react'
import { Header } from '@/widgets/layouts/headers'

interface Props {
  children: ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto mt-[23px] flex min-h-[100vh] w-full max-w-[1080px] flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  )
}
