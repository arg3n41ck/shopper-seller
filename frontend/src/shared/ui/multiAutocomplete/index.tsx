import { useState, useRef, useEffect, useMemo, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react'
import { ChevronDown, X } from 'react-feather'
import cn from 'classnames'

interface Option {
  id: number
  label: string
  value: string
}

interface AutocompleteProps {
  options: Option[]
  inputLabel: string
  error?: boolean | undefined
  onChange: (value: Option[]) => void
}

const MultiAutocomplete: FC<AutocompleteProps> = ({ options, inputLabel, error, onChange }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    setShowOptions(true)
  }, [])

  const handleOptionClick = useCallback(
    (option: Option) => {
      setInputValue('')
      setSelectedOptions([...selectedOptions, option])
      onChange([...selectedOptions, option])
      setShowOptions(false)
    },
    [selectedOptions, options],
  )

  const handleRemoveOption = useCallback(
    (option: Option) => {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id))
    },
    [selectedOptions, options],
  )

  const filteredOptions = useMemo<Option[]>(() => {
    return options.filter(
      (option) => option.label.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions.includes(option),
    )
  }, [options, inputValue, selectedOptions])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event
      const lastSelectedOption = selectedOptions[selectedOptions.length - 1]
      if (key === 'Backspace' && !inputValue && lastSelectedOption) {
        handleRemoveOption(lastSelectedOption)
      }
    },
    [handleRemoveOption, inputValue],
  )

  const handleBlur = useCallback(() => {
    const timerId = setTimeout(() => {
      setShowOptions(false)
    }, 200)

    return () => clearTimeout(timerId)
  }, [selectedOptions])

  useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showOptions])

  return (
    <>
      <div className="mt-[21.5px] flex flex-wrap gap-[6px]">
        {!!selectedOptions?.length &&
          selectedOptions.map((option) => (
            <div
              className="inline-flex items-center gap-[6px] rounded-[6px] bg-neutral-300 px-[8px] py-[4px] text-[13.33px] text-neutral-900"
              key={option.id}
            >
              {option.label}
              <X onClick={() => handleRemoveOption(option)} size={18} cursor="pointer" />
            </div>
          ))}
      </div>
      <div className="relative mt-[23.5px] w-full max-w-[255px] flex-wrap">
        <div className="relative flex items-center">
          <input
            className={cn(
              `
              w-full rounded-[8px] border-[1px] border-black bg-none px-[20px] py-[12px]
              text-[16px] outline-none placeholder:text-[18px] placeholder:font-[500] placeholder:leading-[22px]
              placeholder:text-black
              `,
              { ['!border-error500 placeholder:!text-error500']: error },
            )}
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowOptions(true)}
            onBlur={handleBlur}
            placeholder={inputLabel}
          />
          <div
            className={cn('absolute right-[20px] z-[1] cursor-pointer transition-all ease-in-out', {
              ['rotate-180']: showOptions,
            })}
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <ChevronDown />
          </div>
        </div>

        {showOptions && !!filteredOptions?.length && (
          <ul
            className={`
          absolute top-[100%] z-[2] mt-[5px] max-h-[200px] w-full 
          overflow-y-auto rounded-[8px] border-[1px] border-black bg-white
          `}
          >
            {filteredOptions.map((option) => (
              <li
                className="cursor-pointer p-[10px] text-[16px] transition-all hover:bg-neutral-100"
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MultiAutocomplete
