import React, { useState, useRef } from 'react'
import cn from 'classnames'
import { ChevronDown } from 'react-feather'
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick'
import { HoverSideMenuDesktop } from './HoverSideMenuProps'
import { Category } from '@/shared/api/gen'

interface CustomSelectHoverProps {
  value: string
  options: Category[] | Category | undefined
  onClick?: (item: string) => void
  className?: string
  placeholder?: string
}

export const CustomSelectHover: React.FC<CustomSelectHoverProps> = ({
  value,
  options,
  onClick,
  className,
  placeholder,
}) => {
  const selectRef = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleShowOptions = () => setIsOpen((prev) => !prev)

  useOutsideClick(selectRef, () => {
    setIsOpen(false)
  })

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      <div
        onClick={handleShowOptions}
        className={cn(
          'flex h-[48px] w-max cursor-pointer items-center justify-between gap-[6px] border-[1px] border-neutral-300 px-[9px] py-[8px] text-[18px] text-neutral-400',
          { ['border-neutral-900 text-neutral-900']: value },
        )}
      >
        <p>{(options as Category[])?.find((option) => option.slug === value)?.title || value || placeholder}</p>

        <div className={cn('transition-all duration-[0.1s] ease-in-out', { ['rotate-180']: isOpen })}>
          <ChevronDown />
        </div>
      </div>

      {isOpen && <HoverSideMenuDesktop options={options} onClick={onClick} child={false} />}
    </div>
  )
}
