import { FC } from "react";
import { ButtonContainer, SizeAndQuantityVariantFields } from "../styles";
import TextField from "@/shared/ui/textField";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import Button from "@/shared/ui/button";
import { ButtonInfoCont } from "@/pages/auth/styles";
import { Plus } from "react-feather";
import { BUTTON_STYLES } from "@/shared/lib/consts/styles";
import { SizeQuantityType } from "../createVariantModal/ui";

interface Props {
  value: SizeQuantityType[];
  onChange: (name: string, value: string | SizeQuantityType[]) => void;
  touched: FormikTouched<SizeQuantityType>[] | undefined;
  error: FormikErrors<SizeQuantityType>[] | string | string[] | undefined;
}

interface FormValues {
  size_quantity: SizeQuantityType[];
}

const isFieldsFilledBeforeIndex = (
  values: SizeQuantityType[],
  index: number
) => {
  for (let i = 0; i < index; i++) {
    if (!values[i].size || !values[i].quantity) {
      return false;
    }
  }
  return true;
};

const func = (obj: any, key: string) => {
  return !!obj?.[key];
};

const func2 = (obj: any, key: string) => {
  return obj?.[key];
};

const SizesAndQuantity: FC<Props> = ({ value, onChange, touched, error }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      size_quantity: [{ size: "", quantity: "" }],
    },
    onSubmit: (_, { resetForm }) => {
      resetForm();
    },
  });

  const handleAddFields = async () => {
    if (isFieldsFilledBeforeIndex(value, value.length)) {
      onChange("size_quantity", [...value, { size: "", quantity: "" }]);
    }
  };

  return (
    <>
      {value.map((sizeQuantityItem: SizeQuantityType, index: number) => {
        return (
          <SizeAndQuantityVariantFields key={index}>
            <TextField
              name={`size_quantity[${index}].size`}
              value={sizeQuantityItem.size}
              onChange={(e) => {
                formik.handleChange(e);
                onChange(`size_quantity[${index}].size`, e.target.value);
              }}
              placeholder={"Размер"}
              error={
                touched?.[index]?.size && Boolean(func(error?.[index], "size"))
              }
              errorMessage={
                touched?.[index]?.size && func2(error?.[index], "size")
              }
            />

            <TextField
              name={`size_quantity[${index}].quantity`}
              value={sizeQuantityItem.quantity}
              onChange={(e) => {
                formik.handleChange(e);
                onChange(`size_quantity[${index}].quantity`, e.target.value);
              }}
              placeholder={"Количество"}
              error={
                touched?.[index]?.quantity &&
                Boolean(func(error?.[index], "quantity"))
              }
              errorMessage={
                touched?.[index]?.quantity && func2(error?.[index], "quantity")
              }
            />
          </SizeAndQuantityVariantFields>
        );
      })}

      <Button
        onClick={handleAddFields}
        variant={BUTTON_STYLES.primaryCta}
        type="button"
        className={"max-w-[48px] mx-auto"}
      >
        <Plus />
      </Button>
    </>
  );
};

export default SizesAndQuantity;
