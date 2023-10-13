import React, { FC, useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick'
import cn from 'classnames'

type SelectProps = {
  options: any[]
  value: string
  inputLabel?: string
  placeholder?: string
  error?: boolean
  errorMessage?: any
  onChange: (value: string) => void
  width?: string
  fieldTitle: string
  fieldValue: string
  className?: string
}

const CustomSelect: FC<SelectProps> = ({
  options,
  value,
  onChange,
  inputLabel,
  placeholder,
  width,
  error,
  errorMessage,
  fieldTitle,
  fieldValue,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)
  const [focused, setFocus] = useState(false)
  const isActive = focused || value

  const handleSelect = (optionValue: any) => {
    setIsOpen(false)
    onChange(optionValue[fieldValue])
  }

  useOutsideClick(selectRef, () => {
    setIsOpen(false)
  })

  return (
    <div
      ref={selectRef}
      style={{ width }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={cn('relative', className)}
    >
      {inputLabel && <label className="leading-[16px] text-[13p.33px] text-neutral-900">{inputLabel}</label>}

      <div
        className={cn(
          'flex h-[48px] w-full cursor-pointer items-center border-[1px] border-neutral-300 px-[9px] py-[8px]',
          { ['border-neutral-900 text-neutral-900']: isActive, ['mt-2']: inputLabel, ['border-error500']: error },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option[fieldValue] === value)?.[fieldTitle] || placeholder} {/*position: absolute;*/}
        <div
          className={cn('absolute right-[15px] transition-all duration-[0.1s] ease-in-out', { ['rotate-180']: isOpen })}
        >
          <ChevronDown />
        </div>
      </div>

      {isOpen && (
        <>
          {!!options.length && (
            <ul className="absolute left-0 z-[1] m-0 max-h-[200px] w-full list-none overflow-y-auto border-[1px] border-neutral-300 bg-white p-0">
              {options.map((option) => (
                <li
                  className="block h-auto cursor-pointer p-[8px] transition-all hover:bg-neutral-300"
                  key={option.id}
                  onClick={() => handleSelect(option)}
                >
                  {option[fieldTitle]}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {errorMessage && <label className="text-[11.11px] text-error500">{errorMessage}</label>}
    </div>
  )
}

export default CustomSelect
