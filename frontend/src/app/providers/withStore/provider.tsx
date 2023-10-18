import React from 'react'
import { Provider } from 'react-redux'
import { store } from './config'

export const WithStore = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
