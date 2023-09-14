import React, { FC, ReactNode, useMemo } from "react";
import { LKSellerContainerWithBackground } from "@/pages/lk-seller/styles";
import { PATH_LK_SELLER_CREATE_PRODUCT } from "@/shared/routes/paths";
import {
  StepsBlock,
  StepsBlockWithText,
  StepsContainer,
  StepsText,
} from "./styles";
import { useTranslation } from "react-i18next";
import {
  LK_SELLER_STEP_PAGINATION,
  LK_SELLER_STEP_SUBMIT_BUTTON,
  SlotsProvider,
} from "./slots";
import { useRouter } from "next/router";

type Step = { path: string };

export const steps: Step[] = [
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step1 },
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step2 },
  { path: PATH_LK_SELLER_CREATE_PRODUCT.step3 },
];

interface CreateProductLayoutProps {
  children: ReactNode;
}

const CreateProductLayout: FC<CreateProductLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const isPreviewProductPage =
    router.pathname === PATH_LK_SELLER_CREATE_PRODUCT.previewProduct;

  const currentStep = useMemo(
    () => steps.findIndex((step) => router.pathname === step.path) + 1,
    [router.pathname]
  );

  return (
    <>
      <LKSellerContainerWithBackground>
        <SlotsProvider>
          {(slots) => (
            <>
              {children}
              {!isPreviewProductPage && (
                <StepsContainer>
                  {slots[LK_SELLER_STEP_SUBMIT_BUTTON]}
                </StepsContainer>
              )}
            </>
          )}
        </SlotsProvider>
      </LKSellerContainerWithBackground>
    </>
  );
};

export default CreateProductLayout;
