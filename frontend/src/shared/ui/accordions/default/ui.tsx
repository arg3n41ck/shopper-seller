import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import cn from 'classnames'

interface AccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAccordionClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={cn(className, 'overflow-hidden')}>
      <div className="flex cursor-pointer items-center justify-between" onClick={handleAccordionClick}>
        {title}
        <div className={cn('ml-[16px] transition-all ease-in-out', { ['rotate-180']: isOpen })}>
          <ChevronDown />
        </div>
      </div>
      {isOpen && (
        <div
          className={cn('mt-[10px] overflow-hidden transition-all ease-in-out', {
            ['max-w-[1000px]']: isOpen,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}
