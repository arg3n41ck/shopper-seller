import React, { useState, useRef, ReactNode } from 'react'
import cn from 'classnames'
import { ChevronDown, ChevronRight } from 'react-feather'
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick'
import { HoverSideMenuDesktop } from './HoverSideMenuProps'
import { Category } from '@/shared/api/gen'
import { findCategoryAndParents } from '@/shared/lib/helpers'

interface CustomSelectHoverProps {
  value: string | number
  options: Category[] | undefined
  onClick?: (item: Category) => void
  className?: string
  placeholder?: string
  showBreadCrumb?: boolean
  label?: string | ReactNode
  error?: boolean
  errorMessage?: string
  helperText?: string
}

export const CustomSelectHover: React.FC<CustomSelectHoverProps> = ({
  value,
  options,
  onClick,
  className,
  placeholder,
  showBreadCrumb = false,
  label,
  error,
  errorMessage,
  helperText,
}) => {
  const selectRef = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const breadcrumb = findCategoryAndParents(options, value)
  const [focused, setFocus] = useState(false)
  const isActive = focused || value

  const handleShowOptions = () => setIsOpen((prev) => !prev)

  useOutsideClick(selectRef, () => {
    setIsOpen(false)
  })

  return (
    <div ref={selectRef} onFocus={() => setFocus(true)} className={cn('relative', className)}>
      {label && <label className={cn('text-[13.33px] font-[400] text-neutral-900', isActive)}>{label}</label>}

      <div
        onClick={handleShowOptions}
        className={cn(
          'flex h-[48px] w-full cursor-pointer items-center justify-between gap-[6px] border-[1px] border-neutral-300 px-[9px] py-[8px] text-[18px] text-neutral-400',
          { ['border-neutral-900 text-neutral-900']: value },
          {
            ['!border-error500']: error,
            ['!border-neutral-900']: isActive,
            ['mt-2']: !!label,
          },
          className,
        )}
      >
        <div className="flex w-max">
          {showBreadCrumb ? (
            breadcrumb?.length ? (
              breadcrumb.map((catTitle, index) => (
                <span key={index} className="mr-1 flex w-full items-center gap-1 text-base">
                  {index > 0 && <ChevronRight size={16} />}
                  {catTitle}
                </span>
              ))
            ) : (
              placeholder
            )
          ) : (
            <p>{(options as Category[])?.find((option) => option.slug === value)?.title || value || placeholder}</p>
          )}
        </div>

        <div className={cn('transition-all duration-[0.1s] ease-in-out', { ['rotate-180']: isOpen })}>
          <ChevronDown />
        </div>
      </div>

      {errorMessage ? (
        <label className="text-[11.11px] font-[400] text-error500">{errorMessage}</label>
      ) : (
        <label className="text-[11.11px] font-[400] text-neutral-400">{helperText}</label>
      )}

      {isOpen && <HoverSideMenuDesktop options={options} onClick={onClick} child={false} />}
    </div>
  )
}
