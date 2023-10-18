import React from 'react'
import { WithStore } from '@/app/providers/withStore'

interface WithProvidersProps {
  children: React.ReactNode
  // pageProps: TPagesProps
}
export const WithProviders = ({ children }: WithProvidersProps) => {
  return <WithStore>{children}</WithStore>
}
