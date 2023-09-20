type TypeCheckUserByEmail = {
  email: string;
};

type TypeAddressData = {
  id: string;
  address: string;
  phone_number: string;
};

type TypeSellerInfoData = {
  shop_name: string;
  site: string;
  instagram: string;
};

type OptionType = {
  id?: string;
  name: string;
  value: string;
};

interface CreateProductState {
  product_name: string;
  product_type: string;
  price: string;
  discount: string;
  category_id: string;
  subcategory_id: string;
  materials: OptionType[];
  details: OptionType[];
  sizesAndFit: OptionType[];
  variant: {
    color_variant: string;
    price: string;
    images: string[];
    size_quantity: { size: string; quantity: string }[];
  };
  date: string;
  time: string;
}

export type {
  TypeCheckUserByEmail,
  TypeAddressData,
  TypeSellerInfoData,
  OptionType,
  CreateProductState,
};
