import SuccessAction from '@/shared/ui/templates/authSucess'
import { AuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'
import React from 'react'

const AuthSuccess = () => {
  const router = useRouter()
  const title = (router.query?.title as string) || ''
  const buttonTitle = (router.query?.buttonTitle as string) || ''
  const path = (router.query?.path as string) || ''

  return (
    <AuthLayout>
      <SuccessAction title={title} buttonTitle={buttonTitle} path={path} />
    </AuthLayout>
  )
}

export default AuthSuccess
