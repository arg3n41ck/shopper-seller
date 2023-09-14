import { FC, useRef, useState } from "react";
import {
  Option,
  OptionsList,
  SelectWrapper,
  SelectedOption,
  SelectLabel,
  IconCont,
  ErrorText,
} from "./styles";
import { ChevronDown } from "react-feather";
import useOutsideClick from "@/shared/lib/hooks/useOutsideClick";
import { NEUTRAL } from "@/shared/lib/consts/styles";

type SelectProps = {
  options: any[];
  value: string;
  inputLabel?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: any;
  onChange: (value: string) => void;
  width?: string;
  fieldTitle: string;
  fieldValue: string;
  className?: string;
};

const CustomSelect: FC<SelectProps> = ({
  options,
  value,
  onChange,
  inputLabel,
  placeholder,
  width,
  error,
  errorMessage,
  fieldTitle,
  fieldValue,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [focused, setFocus] = useState(false);
  const isActive = focused || value;

  const handleSelect = (optionValue: any) => {
    setIsOpen(false);
    onChange(optionValue[fieldValue]);
  };

  useOutsideClick(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <SelectWrapper
      ref={selectRef}
      style={{ width }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={className}
    >
      {inputLabel && <SelectLabel>{inputLabel}</SelectLabel>}
      <SelectedOption
        className={`${isActive ? "active" : ""} ${inputLabel ? "mt-2" : ""}  ${
          error ? "error" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option[fieldValue] === value)?.[fieldTitle] ||
          placeholder}{" "}
        <IconCont open={isOpen}>
          <ChevronDown />
        </IconCont>
      </SelectedOption>

      {isOpen && (
        <>
          {!!options.length && (
            <OptionsList>
              {options.map((option) => (
                <Option key={option.id} onClick={() => handleSelect(option)}>
                  {option[fieldTitle]}
                </Option>
              ))}
            </OptionsList>
          )}
        </>
      )}

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </SelectWrapper>
  );
};

export default CustomSelect;
