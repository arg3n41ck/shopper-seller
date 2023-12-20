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
    if (newHours === '' || (newHours.length <= 2 && !isNaN(+newHours) && +newHours <= 23)) {
      setHours(newHours)
      onTimeChange(newHours ? parseInt(newHours, 10) : 0, parseInt(minutes, 10))
    }
  }

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = event.target.value
    if (newMinutes === '' || (newMinutes.length <= 2 && !isNaN(+newMinutes) && +newMinutes <= 59)) {
      setMinutes(newMinutes)
      onTimeChange(parseInt(hours, 10), newMinutes ? parseInt(newMinutes, 10) : 0)
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
