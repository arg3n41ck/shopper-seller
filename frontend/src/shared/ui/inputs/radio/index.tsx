import React, { FC, ReactNode } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'

interface CustomRadioProps {
  name: string
  value: string
  checked?: boolean
  onChange?: (value: string) => void
  children?: ReactNode
}

const Radio: FC<CustomRadioProps> = ({ name, value, checked, onChange, children }) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <label className="flex cursor-pointer items-center gap-x-[8px]">
      <input
        className={cn('absolute opacity-0', styles.radioInput)}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span
        className={cn('relative mr-2 inline-block h-5 w-5 rounded-full border-2 border-black', styles.radioLabel)}
      />
      <p className="text-[18px] font-[500] leading-[22px] text-black">{children}</p>
    </label>
  )
}

export default Radio
