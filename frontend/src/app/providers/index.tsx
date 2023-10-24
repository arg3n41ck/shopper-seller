import React from 'react'
import { WithStore } from '@/app/providers/withStore'
import { WithQuery } from '@/app/providers/withQuery/provider'
import { TPagesProps } from '@/shared/lib/types/app'

interface WithProvidersProps {
  children: React.ReactNode
  pageProps: TPagesProps
}
export const WithProviders = ({ children, pageProps }: WithProvidersProps) => {
  return (
    <WithQuery pageProps={pageProps}>
      <WithStore>{children}</WithStore>
    </WithQuery>
  )
}
