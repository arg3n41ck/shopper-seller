import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  outline: none;
`;

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  [x: string]: any;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let inputValue = e.target.value;

    if (inputValue.length === 2 && !inputValue.includes("-")) {
      inputValue += "-";
    } else if (
      inputValue.length === 5 &&
      inputValue.charAt(2) === "-" &&
      !inputValue.includes("-", 3)
    ) {
      inputValue += "-";
    }

    onChange(inputValue);

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if (dateRegex.test(inputValue)) {
      const parts = inputValue.split("-");
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month - 1, day);

      if (!isNaN(date.getTime())) {
        console.log("Допустимая дата:", date.toDateString());
      }
    } else {
      console.log("Недопустимая дата");
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="MM-DD-YYYY"
      {...rest}
    />
  );
};
