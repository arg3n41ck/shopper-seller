import { FC, ReactNode } from "react";
import { OutletWrapper, MainWrapper } from "./styles";
import Header from "@/components/Headers/AuthHeader";

interface AuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayout> = ({ children }) => {
  return (
    <MainWrapper>
      <Header />
      <OutletWrapper>{children}</OutletWrapper>
    </MainWrapper>
  );
};

export default AuthLayout;
