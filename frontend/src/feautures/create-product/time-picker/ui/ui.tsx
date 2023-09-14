import React, { useState } from "react";
import {
  TimerPickerContainer,
  TimerPickerInput,
  TimerPickerSplitText,
} from "./styles";

interface TimerPickerProps {
  onTimeChange: (hours: number, minutes: number) => void;
}

export const TimerPicker: React.FC<TimerPickerProps> = ({ onTimeChange }) => {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = event.target.value;
    if (/^\d{0,2}$/.test(newHours) && parseInt(newHours, 10) <= 23) {
      setHours(newHours);
      onTimeChange(parseInt(newHours, 10), parseInt(minutes, 10));
    } else {
      setHours("");
    }
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = event.target.value;
    if (/^\d{0,2}$/.test(newMinutes) && parseInt(newMinutes, 10) <= 59) {
      setMinutes(newMinutes);
      onTimeChange(parseInt(hours, 10), parseInt(newMinutes, 10));
    } else {
      setMinutes("");
    }
  };

  return (
    <TimerPickerContainer>
      <TimerPickerInput
        type="text"
        value={hours}
        onChange={handleHoursChange}
        placeholder="00"
        $hasValue={hours.length > 0}
      />

      <TimerPickerSplitText>:</TimerPickerSplitText>

      <TimerPickerInput
        type="text"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="00"
        $hasValue={minutes.length > 0}
      />
    </TimerPickerContainer>
  );
};
