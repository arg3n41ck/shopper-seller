import { FC, ReactNode } from 'react';
import { ChildrenText, RadioInput, RadioLabel, RadioWrapper } from './styles';

interface CustomRadioProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children?: ReactNode;
}

const Radio: FC<CustomRadioProps> = ({
  name,
  value,
  checked,
  onChange,
  children,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioWrapper>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <RadioLabel />
      <ChildrenText>{children}</ChildrenText>
    </RadioWrapper>
  );
};

export default Radio;
