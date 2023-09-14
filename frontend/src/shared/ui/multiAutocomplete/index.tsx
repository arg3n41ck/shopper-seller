import { useState, useRef, useEffect, useMemo, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react';
import { ChevronDown, X } from 'react-feather';
import {
  AutocompleteContainer,
  AutocompleteIconCont,
  ChevronDownIconCont,
  Input,
  Option,
  OptionList,
  SelectedOption,
  SelectedOptionCont,
} from './styles';

interface Option {
  id: number;
  label: string;
  value: string;
}

interface AutocompleteProps {
  options: Option[];
  inputLabel: string;
  error?: boolean | undefined;
  onChange: (value: Option[]) => void;
}

const MultiAutocomplete: FC<AutocompleteProps> = ({ options, inputLabel, error, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowOptions(true);
  }, []);

  const handleOptionClick = useCallback(
    (option: Option) => {
      setInputValue('');
      setSelectedOptions([...selectedOptions, option]);
      onChange([...selectedOptions, option]);
      setShowOptions(false);
    },
    [selectedOptions, options],
  );

  const handleRemoveOption = useCallback(
    (option: Option) => {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id));
    },
    [selectedOptions, options],
  );

  const filteredOptions = useMemo<Option[]>(() => {
    return options.filter(
      (option) => option.label.toLowerCase().includes(inputValue.toLowerCase()) && !selectedOptions.includes(option),
    );
  }, [options, inputValue, selectedOptions]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
      if (key === 'Backspace' && !inputValue && lastSelectedOption) {
        handleRemoveOption(lastSelectedOption);
      }
    },
    [handleRemoveOption, inputValue],
  );

  const handleBlur = useCallback(() => {
    const timerId = setTimeout(() => {
      setShowOptions(false);
    }, 200);

    return () => clearTimeout(timerId);
  }, [selectedOptions]);

  useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showOptions]);

  return (
    <>
      <SelectedOptionCont>
        {!!selectedOptions?.length &&
          selectedOptions.map((option) => (
            <SelectedOption key={option.id}>
              {option.label}
              <X onClick={() => handleRemoveOption(option)} size={18} cursor="pointer" />
            </SelectedOption>
          ))}
      </SelectedOptionCont>
      <AutocompleteContainer error={error}>
        <AutocompleteIconCont>
          <Input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowOptions(true)}
            onBlur={handleBlur}
            placeholder={inputLabel}
            error={error}
          />

          <ChevronDownIconCont onClick={() => setShowOptions((prev) => !prev)} open={showOptions}>
            <ChevronDown />
          </ChevronDownIconCont>
        </AutocompleteIconCont>

        {showOptions && !!filteredOptions?.length && (
          <OptionList>
            {filteredOptions.map((option) => (
              <Option key={option.id} onClick={() => handleOptionClick(option)}>
                {option.label}
              </Option>
            ))}
          </OptionList>
        )}
      </AutocompleteContainer>
    </>
  );
};

export default MultiAutocomplete;
