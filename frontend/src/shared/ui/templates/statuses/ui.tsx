import { statuses } from '@/shared/lib/consts/globals'
import React, { FC } from 'react'

interface TypeStatusesProps {
  type: 'order' | 'product'
  status: string | undefined
}

export const Statuses: FC<TypeStatusesProps> = ({ type, status }) => {
  const typeStyles = statuses[type.toLowerCase()]
  const statusInfo = typeStyles[status || '']

  if (!statusInfo) return null

  return (
    <div
      className="flex max-w-max items-center justify-center gap-1 rounded-[13px] px-1.5 py-0.5"
      style={{ backgroundColor: statusInfo.background }}
    >
      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusInfo.color }} />

      <p className="text-xs font-medium" style={{ color: statusInfo.color }}>
        {statusInfo.title}
      </p>
    </div>
  )
}
