import { AppProps } from 'next/app'
import { NextPage } from 'next'

export type TPagesProps = {
  dehydratedState?: unknown
}
export type TComponentProps = { mainLayout?: boolean; isOnlyAuthUser?: boolean; isOnlyUnAuth?: boolean }

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & TComponentProps

export type AppPropsType = AppProps & {
  pageProps: TPagesProps
  Component: PageWithLayout
}
