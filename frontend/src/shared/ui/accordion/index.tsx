import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import cn from 'classnames'

interface AccordionProps {
  title: string
  children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAccordionClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="overflow-hidden rounded-[4px] px-[20px] py-[12px]">
      <div className="flex cursor-pointer items-center" onClick={handleAccordionClick}>
        <h3 className="m-0 flex-1 text-[18px] font-[600px] leading-[22px] text-neutral-900">{title}</h3>
        <div className={cn('ml-[16px] transition-all ease-in-out', { ['rotate-180']: isOpen })}>
          <ChevronDown />
        </div>
      </div>
      {isOpen && (
        <div
          className={cn('mt-[10px] max-h-[0] overflow-hidden transition-all ease-in-out', {
            ['max-w-[1000px]']: isOpen,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion
