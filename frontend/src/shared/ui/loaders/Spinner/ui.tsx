import React from 'react'
import { Loader } from 'react-feather'

interface LoaderProps {
  loading: boolean
  size?: number | string
}

export const LoaderIcon = ({ loading, size }: LoaderProps) => {
  if (!loading) return null

  return (
    <div>
      <Loader className="animate-spin ease-linear" style={{ animationDuration: '2s' }} size={size} />
    </div>
  )
}
