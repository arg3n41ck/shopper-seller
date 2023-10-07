import { ChangeEvent, FC, ReactNode, useRef, useState } from 'react'
import { TFInput } from './styles'
import cn from 'classnames'

interface TextFieldProps {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  value: string
  label?: string | ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  errorMessage?: any
  helperText?: string
  className?: string
  [x: string]: any
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
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocus] = useState(false)
  const isActive = focused || value

  return (
    <div className={cn('relative w-full', className)}>
      {label && <label className={cn('text-neutral900 text-[13.33px] font-[400]', isActive)}>{label}</label>}

      <div
        onClick={() => inputRef.current && inputRef.current.focus()}
        className={cn('border-neutral300 relative flex items-center gap-4 border px-[16px] py-[13px] text-black', {
          ['!border-error500']: error,
          ['!border-neutral900']: isActive,
          ['mt-2']: !!label,
        })}
      >
        {startAdornment && startAdornment}

        <input hidden autoComplete="" />

        {/*todo tailwind*/}
        <TFInput
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={error ? 'error' : ''}
          {...others}
        />
        {endAdornment && (
          <div className={cn('text-neutral400', { ['!text-neutral900']: isActive })}>{endAdornment}</div>
        )}
      </div>
      {errorMessage ? (
        <label className="text-error500 text-[11.11px] font-[400]">{errorMessage}</label>
      ) : (
        <label className="text-neutral400 text-[11.11px] font-[400]">{helperText}</label>
      )}
    </div>
  )
}

export default TextField
