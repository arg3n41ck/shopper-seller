import React from "react";
import { PreviewProduct } from "@/widgets/lkSeller";
import CreateProductLayout from "@/components/Layouts/CreateProductLayout";
import LKSellerLayout from "@/components/Layouts/LKSellerLayout";

const PreviewProductPage = () => {
  return (
    <LKSellerLayout>
      <CreateProductLayout>
        <PreviewProduct />
      </CreateProductLayout>
    </LKSellerLayout>
  );
};

export default PreviewProductPage;
