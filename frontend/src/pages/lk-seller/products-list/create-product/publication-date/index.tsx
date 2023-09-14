import React from 'react';
import { PublicationDateProduct } from '@/widgets/lkSeller';
import CreateProductLayout from '@/components/Layouts/CreateProductLayout';
import LKSellerLayout from '@/components/Layouts/LKSellerLayout';

const PublicationDatePage = () => {
  return (
    <LKSellerLayout>
      <CreateProductLayout>
        <PublicationDateProduct />
      </CreateProductLayout>
    </LKSellerLayout>
  );
};

export default PublicationDatePage;
