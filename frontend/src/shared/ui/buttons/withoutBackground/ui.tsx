import React, { ReactNode } from 'react'
import cn from 'classnames'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  padding?: string
  className?: string
}

export const CustomButtonWithoutBackground: React.FC<ButtonProps> = ({
  children,
  onClick,
  padding = '12px 55px',
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ padding }}
      className={cn(
        `
      flex w-fit cursor-pointer items-center justify-center 
      gap-[8px] border-[1px] border-[#171717] text-[16px] 
      font-[500] text-[#171717]
      `,
        className,
      )}
    >
      {children}
    </button>
  )
}
