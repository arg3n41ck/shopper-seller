import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import {
  DatePickerArrowButton,
  DatePickerContainer,
  DatePickerDay,
  DatePickerDaysContainer,
  DatePickerHeader,
  DatePickerMonthText,
  DatePickerWeekDays,
} from "./styles";
import { GroupArrows } from "@/assets/icons/svg/GroupArrows";

const DAY_FORMAT = "d";
const MONTH_YEAR_FORMAT = "MMMM yyyy";
const DATE_FORMAT = "MM-dd-yyyy";

const week = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarProps {
  initialDate: string;
  onDateSelect?: (date: string) => void;
}

export const DatePicker: React.FC<CalendarProps> = ({
  initialDate,
  onDateSelect,
}) => {
  const [activeMonth, setActiveMonth] = useState<string>(initialDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleMonthChange = (monthOffset: number) => {
    const newDate = addMonths(new Date(activeMonth), monthOffset);
    setActiveMonth(format(newDate, DATE_FORMAT));
  };

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleMonthChange(-1);
  };

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleMonthChange(1);
  };

  const handleDayClick = (date: Date) => {
    if (onDateSelect) {
      const formattedDate = format(date, DATE_FORMAT);
      onDateSelect(formattedDate);
    }
    setSelectedDate(format(date, DATE_FORMAT));
  };

  const startOfCurrentMonth = startOfWeek(startOfMonth(new Date(activeMonth)), {
    weekStartsOn: 1,
  });

  const daysInMonth = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = addDays(startOfCurrentMonth, i);
    const isInactive = !isSameMonth(currentDate, new Date(activeMonth));
    const formattedDate = format(currentDate, DATE_FORMAT);

    let selected = false;
    if (formattedDate === selectedDate) {
      selected = true;
    }

    daysInMonth.push({
      date: formattedDate,
      isInactive,
      selected,
    });
  }

  useEffect(() => {
    setActiveMonth(initialDate);
  }, [initialDate]);

  return (
    <DatePickerContainer>
      <DatePickerHeader>
        <DatePickerArrowButton onClick={handlePrevMonth}>
          <GroupArrows side="left" />
        </DatePickerArrowButton>

        <DatePickerMonthText>
          {format(new Date(activeMonth), MONTH_YEAR_FORMAT)}
        </DatePickerMonthText>

        <DatePickerArrowButton onClick={handleNextMonth}>
          <GroupArrows side="right" />
        </DatePickerArrowButton>
      </DatePickerHeader>

      <DatePickerDaysContainer>
        {week.map((day, index) => (
          <DatePickerWeekDays key={index}>{day}</DatePickerWeekDays>
        ))}

        {daysInMonth.map(({ date, isInactive, selected }, index) => (
          <DatePickerDay
            key={index}
            $inActiveMonth={isInactive}
            $selected={selected}
            onClick={() => handleDayClick(new Date(date))}
          >
            {format(new Date(date), DAY_FORMAT)}
          </DatePickerDay>
        ))}
      </DatePickerDaysContainer>
    </DatePickerContainer>
  );
};
