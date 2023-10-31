import { ChangeEvent, FC, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'

interface TextAreaProps {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  value: string
  label?: string | ReactNode
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  error?: boolean
  errorMessage?: string
  helperText?: string
  className?: string
  [x: string]: unknown
}

const TextArea: FC<TextAreaProps> = ({
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocus] = useState(false)
  const isActive = focused || value ? 'active' : ''

  return (
    <div className={cn('relative w-full', className)}>
      {label && <label className="text-[13.33px] text-neutral-900">{label}</label>}

      <div
        onClick={() => textareaRef.current && textareaRef.current.focus()}
        className={cn(
          'relative flex items-center gap-[16px] border-[1px] border-neutral-300 px-[16px] py-[13px] text-black',
          { ['!border-neutral-900']: isActive, ['!border-error500']: error, ['mt-2']: !!label },
        )}
      >
        {startAdornment && startAdornment}

        <textarea
          ref={textareaRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={cn(
            `w-full border-none bg-none text-[16px] font-[600] leading-[19px] 
            text-neutral-900 outline-none placeholder:font-[400] placeholder:text-neutral-400`,
            { ['text-error500']: error },
          )}
          rows={10}
          {...others}
        />

        {endAdornment && (
          <div className={cn('text-neutral-400', { ['text-neutral-900']: isActive })}>{endAdornment}</div>
        )}
      </div>

      {errorMessage ? (
        <label className="text-[11.11px] text-error500">{errorMessage}</label>
      ) : (
        <label className="text-[11.11px] text-neutral-400">{helperText}</label>
      )}
    </div>
  )
}

export default TextArea
