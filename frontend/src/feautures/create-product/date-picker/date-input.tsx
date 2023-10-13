import React, { ComponentPropsWithRef } from 'react'
import cn from 'classnames'

interface DateInputProps extends ComponentPropsWithRef<'input'> {
  handleChange: (value: string) => void
}

export const DateInput = ({ handleChange, className, ...other }: DateInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let inputValue = e.target.value

    if (inputValue.length === 2 && !inputValue.includes('-')) {
      inputValue += '-'
    } else if (inputValue.length === 5 && inputValue.charAt(2) === '-' && !inputValue.includes('-', 3)) {
      inputValue += '-'
    }

    handleChange(inputValue)

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/

    if (dateRegex.test(inputValue)) {
      const parts = inputValue.split('-')
      const month = parseInt(parts[0], 10)
      const day = parseInt(parts[1], 10)
      const year = parseInt(parts[2], 10)

      const date = new Date(year, month - 1, day)

      if (!isNaN(date.getTime())) {
        console.log('Допустимая дата:', date.toDateString())
      }
    } else {
      console.log('Недопустимая дата')
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
      placeholder="MM-DD-YYYY"
      {...other}
    />
  )
}
