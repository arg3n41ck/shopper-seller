import React, { ComponentPropsWithRef, FC, ReactNode } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'

interface CustomCheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string | ReactNode
  error?: boolean | undefined
  errorMessage?: string
  helperText?: string
}

const Checkbox: FC<CustomCheckboxProps> = ({
  label,
  checked = false,
  className,
  error,
  helperText,
  errorMessage,
  ...other
}) => {
  return (
    <>
      <label className={cn('flex cursor-pointer content-center', className)}>
        <input {...other} hidden type="checkbox" checked={checked} />
        <span className={cn(styles.Check, { ['bg-black after:!block']: checked, ['!border-error500']: error })}></span>
        {label && <label className="text-[16px] font-[500] leading-[19px] text-black">{label}</label>}
      </label>

      {errorMessage ? (
        <label className="text-[11.11px] font-[400] text-error500">{errorMessage}</label>
      ) : (
        <label className="text-[11.11px] font-[400] text-neutral-400">{helperText}</label>
      )}
    </>
  )
}

export default Checkbox
