import { FC, useEffect } from "react";
import { ProductsContainer } from "../../../styles";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import { fetchProduct } from "@/shared/store/slices/seller";
import { FooterPreviewProduct } from "../footer";
import ProductDetail from "@/components/ProductDetail";
import { SellerClient } from "@/shared/apis/sellerClient";
import { PATH_LK_SELLER } from "@/shared/routes/paths";
import { useRouter } from "next/router";

const sellerClient = new SellerClient();

const mockDataVariants = {
  id: Date.now(),
  product_name: "Stella McCartney",
  description: "брюки с разрезами ",
  discount: 5,
  preview: [
    {
      id: 1,
      product_images: [
        {
          id: 2,
          main_image: false,
          image_url: "/dog.jpg",
        },
        {
          id: 3,
          main_image: false,
          image_url: "/dog2.jpg",
        },
        {
          id: 4,
          main_image: false,
          image_url: "/fish.jpeg",
        },
        {
          id: 5,
          main_image: true,
          image_url: "/child.png",
        },
        {
          id: 6,
          main_image: false,
          image_url: "/dog2.jpg",
        },
        {
          id: 7,
          main_image: false,
          image_url: "/fish.jpeg",
        },
        {
          id: 222,
          main_image: false,
          image_url: "/dog2.jpg",
        },
        {
          id: 333,
          main_image: false,
          image_url: "/fish.jpeg",
        },
      ],
      color: "red",
      size: [
        {
          id: 8,
          size: "XL",
        },
        {
          id: 9,
          size: "L",
        },
      ],
      availableCount: 543,
      price: 35990,
      description: "Прекрасное описание товара для варианта 1",
    },
    {
      id: 10,
      product_images: [
        {
          id: 11,
          main_image: false,
          image_url: "/dog2.jpg",
        },
        {
          id: 12,
          main_image: true,
          image_url: "/fish.jpeg",
        },
        {
          id: 13,
          main_image: false,
          image_url: "/fish.jpeg",
        },

        {
          id: 14,
          main_image: false,
          image_url: "/dog2.jpg",
        },

        {
          id: 15,
          main_image: false,
          image_url: "/child.png",
        },
        {
          id: 16,
          main_image: false,
          image_url: "/dog.jpg",
        },
        {
          id: 25,
          main_image: false,
          image_url: "/child.png",
        },
        {
          id: 36,
          main_image: false,
          image_url: "/dog.jpg",
        },
      ],
      color: "blue",
      size: [
        {
          id: 17,
          size: "M",
        },
        {
          id: 18,
          size: "S",
        },
      ],
      availableCount: 320,
      price: 29990,
      description: "Прекрасное описание товара для варианта 2",
    },
    {
      id: Date.now() + 12,
      product_images: [
        {
          id: Date.now() + 15,
          main_image: false,
          image_url: "/fish.jpeg",
        },

        {
          id: Date.now() + 17,
          main_image: false,
          image_url: "/dog2.jpg",
        },

        {
          id: Date.now() + 16,
          main_image: false,
          image_url: "/child.png",
        },
        {
          id: Date.now() + 18,
          main_image: false,
          image_url: "/fish.jpeg",
        },
        {
          id: Date.now() + 13,
          main_image: false,
          image_url: "/dog.jpg",
        },
        {
          id: Date.now() + 14,
          main_image: true,
          image_url: "/dog2.jpg",
        },
        {
          id: Date.now() + 133,
          main_image: false,
          image_url: "/fish.jpeg",
        },
        {
          id: Date.now() + 1312,
          main_image: false,
          image_url: "/dog.jpg",
        },
        {
          id: Date.now() + 14321,
          main_image: true,
          image_url: "/dog2.jpg",
        },
      ],
      color: "green",
      size: [
        {
          id: Date.now() + 19,
          size: "XXL",
        },
        {
          id: Date.now() + 20,
          size: "XS",
        },
      ],
      availableCount: 120,
      price: 42990,
      description: "Прекрасное описание товара для варианта 3",
    },
  ],
};

const PreviewProduct: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = (router.query?.id as string) || "";
  const { product } = useAppSelector((state) => state.seller);

  const handlePublishProduct = async (type: string) => {
    const isDraft =
      type === "draft"
        ? {
            product_status: "draft",
          }
        : {
            publish_by_date: true,
          };

    await sellerClient.editProduct({ id: product.id, body: isDraft });
    router.push({ pathname: PATH_LK_SELLER.myProducts });
  };

  useEffect(() => {
    id && dispatch(fetchProduct(id));
  }, []);

  return (
    <ProductsContainer>
      <ProductDetail data={mockDataVariants} />
      <FooterPreviewProduct handlePublishProduct={handlePublishProduct} />
    </ProductsContainer>
  );
};

export default PreviewProduct;
