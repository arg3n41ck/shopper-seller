import React, { FC } from 'react'
import { Loader } from 'react-feather'

interface LoaderProps {
  loading: boolean
  size?: number | string
}

const LoaderIcon: FC<LoaderProps> = ({ loading, size }) => {
  if (!loading) return null

  return (
    <div>
      <Loader className="animate-spin ease-linear" style={{ animationDuration: '2s' }} size={size} />
    </div>
  )
}

export default LoaderIcon
