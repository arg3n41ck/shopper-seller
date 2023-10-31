import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'
import cn from 'classnames'

type AutocompleteProps = {
  // eslint-disable-next-line
  options: any[]
  inputLabel?: string
  width?: string
  onChange: (value: string) => void
  error?: boolean | undefined
  placeholder?: string
  errorMessage?: string
  helperText?: string
  // eslint-disable-next-line
  value?: any
  fieldTitle: string
  fieldValue: string
  className?: string
}

const Autocomplete = ({
  options,
  placeholder,
  inputLabel,
  width,
  onChange,
  error,
  errorMessage,
  value,
  fieldTitle,
  fieldValue,
  helperText,
  className,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerIdRef = useRef<number | null>(null)
  const [focused, setFocus] = useState(false)
  const isActive = focused || value || inputValue

  // eslint-disable-next-line
  const filteredOptions = useMemo<any[]>(() => {
    return options.filter((option) => option[fieldTitle]?.toLowerCase().includes(inputValue?.toLowerCase()))
  }, [options, inputValue])

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    setShowOptions(true)
  }, [])

  // eslint-disable-next-line
  const handleItemClick = (option: any) => {
    setInputValue(option[fieldTitle])
    setShowOptions(false)
    onChange(option[fieldValue])
  }

  const handleBlur = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
      timerIdRef.current = null
    }

    timerIdRef.current = window.setTimeout(() => {
      setShowOptions(false)
    }, 200)
  }, [])

  useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showOptions])

  return (
    <div className={cn(className, 'w-[100%]')}>
      {inputLabel && <label className="text-[13.33px] leading-[16px] text-neutral-900">{inputLabel}</label>}
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={cn(`relative max-w-[${width}] flex w-full flex-col items-end justify-center`, {
          ['mt-2']: inputLabel,
        })}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={options.find((option) => option[fieldValue] === value)?.[fieldTitle] || inputValue}
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={() => setShowOptions(true)}
          onBlur={handleBlur}
          className={cn(
            'w-full border-[1px] border-neutral-300 bg-none py-[11px] pl-[11px] pr-[40px] text-[16px] text-neutral-400 outline-none',
            {
              ['!border-neutral-900 text-neutral-900']: isActive,
              ['!border-error500 text-error500']: error,
            },
          )}
        />
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className={cn('absolute right-[15px] cursor-pointer text-neutral-400 transition-all ease-in-out', {
            ['rotate-180']: showOptions,
            ['text-neutral-900']: isActive,
            ['text-error500']: error,
          })}
        >
          <ChevronDown />
        </div>
        {showOptions && !!filteredOptions?.length && (
          <ul className="absolute top-[100%] z-[1] max-h-[200px] w-full overflow-y-auto border-[1px] border-neutral-300 bg-white">
            {filteredOptions.map((option) => (
              <li
                className="cursor-pointer p-[8px] text-[16px] transition-all hover:bg-neutral-100"
                key={option.id}
                onClick={() => handleItemClick(option)}
              >
                {option[fieldTitle]}
              </li>
            ))}
          </ul>
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

export default Autocomplete
