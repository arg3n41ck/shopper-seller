import { FC, ReactNode } from 'react';
import Header from '../../Headers/AuthHeader';
import { MainWrapper, Main } from './styles';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <MainWrapper>
      <Header />
      <Main>{children}</Main>
    </MainWrapper>
  );
};

export default MainLayout;
