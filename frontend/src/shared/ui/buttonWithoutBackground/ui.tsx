import React, { ReactNode } from 'react';
import { ButtonWithoutBackground } from './styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  padding?: string;
  className?: string;
}

export const CustomButtonWithoutBackground: React.FC<ButtonProps> = ({
  children,
  onClick,
  padding = '12px 55px',
  className,
}) => {
  return (
    <ButtonWithoutBackground
      onClick={onClick}
      $padding={padding}
      className={className}
    >
      {children}
    </ButtonWithoutBackground>
  );
};
