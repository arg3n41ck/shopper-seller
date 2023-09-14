import { FC } from 'react';
import { NavContainer } from './styles';
import LogoIcon from '@/assets/icons/svg/LogoIcon';

const Header: FC = () => {
  return (
    <NavContainer>
      <LogoIcon />
    </NavContainer>
  );
};

export default Header;
