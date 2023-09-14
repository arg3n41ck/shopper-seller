import React from 'react';
import { VariantsProduct } from '@/widgets/lkSeller';
import CreateProductLayout from '@/components/Layouts/CreateProductLayout';
import LKSellerLayout from '@/components/Layouts/LKSellerLayout';

const VariantsProductPage = () => {
  return (
    <LKSellerLayout>
      <CreateProductLayout>
        <VariantsProduct />
      </CreateProductLayout>
    </LKSellerLayout>
  );
};

export default VariantsProductPage;
