import Header from '@/components/headers/authHeader'
import { FC, ReactNode } from 'react'

interface Index {
  children: ReactNode
}

const AuthLayout: FC<Index> = ({ children }) => {
  return (
    <div className="mx-auto mt-[23px] flex min-h-[100vh] w-full flex-col px-[48px]">
      <Header />
      <div className="mx-auto my-[60px] flex w-full flex-col">{children}</div>
    </div>
  )
}

export default AuthLayout
