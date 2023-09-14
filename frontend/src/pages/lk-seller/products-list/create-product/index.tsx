import React from "react";
import { InfoAboutProduct } from "@/widgets/lkSeller";
import CreateProductLayout from "@/components/Layouts/CreateProductLayout";
import LKSellerLayout from "@/components/Layouts/LKSellerLayout";

const InfoAboutProductPage = () => {
  return (
    <LKSellerLayout>
      {/* <CreateProductLayout> */}
      <InfoAboutProduct />
      {/* </CreateProductLayout> */}
    </LKSellerLayout>
  );
};

export default InfoAboutProductPage;
