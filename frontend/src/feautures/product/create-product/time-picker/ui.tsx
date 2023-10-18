import React, { useState } from 'react'
import cn from 'classnames'

interface TimerPickerProps {
  onTimeChange: (hours: number, minutes: number) => void
}

export const TimerPicker: React.FC<TimerPickerProps> = ({ onTimeChange }) => {
  const [hours, setHours] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = event.target.value
    if (/^\d{0,2}$/.test(newHours) && parseInt(newHours, 10) <= 23) {
      setHours(newHours)
      onTimeChange(parseInt(newHours, 10), parseInt(minutes, 10))
    } else {
      setHours('')
    }
  }

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = event.target.value
    if (/^\d{0,2}$/.test(newMinutes) && parseInt(newMinutes, 10) <= 59) {
      setMinutes(newMinutes)
      onTimeChange(parseInt(hours, 10), parseInt(newMinutes, 10))
    } else {
      setMinutes('')
    }
  }

  return (
    <div className="flex items-center gap-[16px]">
      <input
        className={cn(
          `
          h-[81px] w-[74px] rounded-[5px] bg-[rgba(103,103,103,0.25)] text-center
          text-[42px] font-[600] text-neutral-900 outline-none transition-all
          placeholder:text-neutral-900 focus:bg-[rgba(79,70,229,0.25)]
          focus:placeholder:text-primaryDash600
          `,
          { ['!bg-[rgba(79,70,229,0.25)] !text-primaryDash600']: hours.length > 0 },
        )}
        type="text"
        value={hours}
        onChange={handleHoursChange}
        placeholder="00"
      />
      <p className="text-[42px] font-[600] text-black">:</p>
      <input
        className={cn(
          `
          h-[81px] w-[74px] rounded-[5px] bg-[rgba(103,103,103,0.25)] text-center
          text-[42px] font-[600] text-neutral-900 outline-none transition-all
          placeholder:text-neutral-900 focus:bg-[rgba(79,70,229,0.25)]
          focus:placeholder:text-primaryDash600
          `,
          { ['!bg-[rgba(79,70,229,0.25)] !text-primaryDash600']: minutes.length > 0 },
        )}
        type="text"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="00"
      />
    </div>
  )
}
