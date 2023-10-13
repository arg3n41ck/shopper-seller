import React, { useEffect, useState } from 'react'
import { format, addMonths, startOfMonth, startOfWeek, addDays, isSameMonth } from 'date-fns'
import { GroupArrows } from '@/assets/icons/svg/GroupArrows'
import cn from 'classnames'

const DAY_FORMAT = 'd'
const MONTH_YEAR_FORMAT = 'MMMM yyyy'
const DATE_FORMAT = 'MM-dd-yyyy'

const week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

interface CalendarProps {
  initialDate: string
  onDateSelect?: (date: string) => void
}

export const DatePicker: React.FC<CalendarProps> = ({ initialDate, onDateSelect }) => {
  const [activeMonth, setActiveMonth] = useState<string>(initialDate)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleMonthChange = (monthOffset: number) => {
    const newDate = addMonths(new Date(activeMonth), monthOffset)
    setActiveMonth(format(newDate, DATE_FORMAT))
  }

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleMonthChange(-1)
  }

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleMonthChange(1)
  }

  const handleDayClick = (date: Date) => {
    if (onDateSelect) {
      const formattedDate = format(date, DATE_FORMAT)
      onDateSelect(formattedDate)
    }
    setSelectedDate(format(date, DATE_FORMAT))
  }

  const startOfCurrentMonth = startOfWeek(startOfMonth(new Date(activeMonth)), {
    weekStartsOn: 1,
  })

  const daysInMonth = []
  for (let i = 0; i < 42; i++) {
    const currentDate = addDays(startOfCurrentMonth, i)
    const isInactive = !isSameMonth(currentDate, new Date(activeMonth))
    const formattedDate = format(currentDate, DATE_FORMAT)

    let selected = false
    if (formattedDate === selectedDate) {
      selected = true
    }

    daysInMonth.push({
      date: formattedDate,
      isInactive,
      selected,
    })
  }

  useEffect(() => {
    setActiveMonth(initialDate)
  }, [initialDate])

  return (
    <div className="w-full max-w-[279px]">
      <div className="flex items-center justify-between">
        <button className="border-none bg-none" onClick={handlePrevMonth}>
          <GroupArrows side="left" />
        </button>

        <h2 className="text-[16px] font-[700] uppercase text-neutral-900">
          {format(new Date(activeMonth), MONTH_YEAR_FORMAT)}
        </h2>

        <button className="border-none bg-none" onClick={handleNextMonth}>
          <GroupArrows side="right" />
        </button>
      </div>

      <div className="grid grid-cols-7">
        {week.map((day, index) => (
          <p
            className="flex h-[40px] w-full items-center justify-center text-center text-[16px] font-[700] text-neutral-900"
            key={index}
          >
            {day}
          </p>
        ))}
        {daysInMonth.map(({ date, isInactive, selected }, index) => (
          <div
            className={cn(
              'flex h-[40px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] text-neutral-400',
              { ['!text-neutral-900']: !isInactive, ['bg-[#DEE2E6]']: selected },
            )}
            key={index}
            onClick={() => handleDayClick(new Date(date))}
          >
            {format(new Date(date), DAY_FORMAT)}
          </div>
        ))}
      </div>
    </div>
  )
}
