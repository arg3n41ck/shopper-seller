import { ComponentPropsWithRef } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import { ButtonVariant } from '@/shared/lib/consts/styles'

type ButtonSize = 'small' | 'large' | 'notSpecified'

const sizeOfButton = {
  small: 'py-[4px] px-[8px] text-[16px]',
  large: 'py-[10px] px-[16px] text-[18px]',
  notSpecified: 'py-[12px] text-[18px]',
}

interface CustomButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = ({
  variant = 'PrimaryCTAButton',
  size = 'notSpecified',
  children,
  className,
  ...other
}: CustomButtonProps) => {
  return (
    <button {...other} className={cn('!w-full', styles.Button, styles[variant], sizeOfButton[size], className)}>
      {children}
    </button>
  )
}
