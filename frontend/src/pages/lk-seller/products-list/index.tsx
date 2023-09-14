import { FC } from "react";
import { LKSellerContainerWithBackground } from "../styles";
import {
  ProductsContainer,
  MyProductsFiltersAndButtonContainer,
  MyProductsHeaderText,
} from "./styles";
import Button from "@/shared/ui/button";
import { ButtonInfoCont } from "@/pages/auth/styles";
import { Plus } from "react-feather";
import { BUTTON_STYLES } from "@/shared/lib/consts/styles";
import { PATH_LK_SELLER_CREATE_PRODUCT } from "@/shared/routes/paths";
import { useRouter } from "next/router";
import LKSellerLayout from "@/components/Layouts/LKSellerLayout";

const MyProducts: FC = () => {
  const router = useRouter();

  const navigateToCreateProduct = () =>
    router.push({ pathname: PATH_LK_SELLER_CREATE_PRODUCT.step1 });

  return (
    <LKSellerLayout>
      <LKSellerContainerWithBackground>
        <ProductsContainer>
          <MyProductsHeaderText>Список товаров</MyProductsHeaderText>

          <MyProductsFiltersAndButtonContainer>
            <Button
              onClick={navigateToCreateProduct}
              variant={BUTTON_STYLES.primaryCta}
              size="large"
            >
              <ButtonInfoCont>
                Добавить товар
                <Plus />
              </ButtonInfoCont>
            </Button>
          </MyProductsFiltersAndButtonContainer>
        </ProductsContainer>
      </LKSellerContainerWithBackground>
    </LKSellerLayout>
  );
};

export default MyProducts;
