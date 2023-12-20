import React, { ComponentPropsWithRef } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { isValid, parse } from 'date-fns'

interface DateInputProps extends ComponentPropsWithRef<'input'> {
  handleChange: (value: string) => void
}

export const DateInput = ({ handleChange, className, ...other }: DateInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    inputValue = inputValue.replace(/[^0-9]/g, '')

    if (inputValue.length <= 4) {
      handleChange(inputValue)
    } else if (inputValue.length <= 6) {
      handleChange(`${inputValue.substring(0, 4)}-${inputValue.substring(4)}`)
    } else {
      handleChange(`${inputValue.substring(0, 4)}-${inputValue.substring(4, 6)}-${inputValue.substring(6, 8)}`)
    }

    if (inputValue.length === 8) {
      const formattedDate = `${inputValue.substring(0, 4)}-${inputValue.substring(4, 6)}-${inputValue.substring(6, 8)}`
      const date = parse(formattedDate, 'yyyy-MM-dd', new Date())

      if (!isValid(date)) {
        toast.warning(`Неверный формат даты`)
      }
    }
  }

  return (
    <input
      className={cn(
        'rounded-[4px] border-[1px] border-neutral-300 px-[16px] py-[8px] text-[16px] outline-none',
        className,
      )}
      type="text"
      onChange={handleInputChange}
      placeholder="YYYY-MM-DD"
      {...other}
    />
  )
}
