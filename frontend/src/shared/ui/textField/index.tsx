import { ChangeEvent, FC, ReactNode, useRef, useState } from "react";
import {
  EndAdornmentCont,
  TFErrorText,
  TFHelperText,
  TFInput,
  TFLabel,
  TextFieldCont,
  TextFieldWrapper,
} from "./styles";

interface TextFieldProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value: string;
  label?: string | ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: any;
  helperText?: string;
  className?: string;
  [x: string]: any;
}

const TextField: FC<TextFieldProps> = ({
  startAdornment,
  endAdornment,
  value,
  label,
  onChange,
  error,
  errorMessage,
  helperText,
  className,
  ...others
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocus] = useState(false);
  const isActive = focused || value ? "active" : "";
  const isError = error ? "error" : "";

  return (
    <TextFieldWrapper className={className}>
      {label && <TFLabel className={`${isActive}`}>{label}</TFLabel>}
      <TextFieldCont
        onClick={() => inputRef.current && inputRef.current.focus()}
        className={`${isError} ${isActive}  ${label ? "mt-2" : ""}`}
      >
        {startAdornment && startAdornment}

        <input hidden autoComplete="" />

        <TFInput
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={`${isError}`}
          {...others}
        />

        {endAdornment && (
          <EndAdornmentCont className={`${isActive}`}>
            {endAdornment}
          </EndAdornmentCont>
        )}
      </TextFieldCont>
      {errorMessage ? (
        <TFErrorText>{errorMessage}</TFErrorText>
      ) : (
        <TFHelperText>{helperText}</TFHelperText>
      )}
    </TextFieldWrapper>
  );
};

export default TextField;
