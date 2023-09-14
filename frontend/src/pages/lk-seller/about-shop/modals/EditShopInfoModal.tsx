import { FC, useEffect, useState } from 'react';
import Modal from '@/shared/ui/modal';
import {
  HeaderTextModal,
  HeaderTextsModalCont,
  ModalInnerContainer,
  TextModal,
} from '@/shared/ui/modal/styles';
import TextField from '@/shared/ui/textField';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Button from '@/shared/ui/button';
import { ButtonInfoCont } from '@/pages/auth/styles';
import LoaderIcon from '@/shared/ui/loader';
import { fetchMe } from '@/shared/store/slices/user';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { PlusCircle } from 'react-feather';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { SellerClient } from '@/shared/apis/sellerClient';
import { fetchSeller } from '@/shared/store/slices/seller';
import { isEqual } from 'lodash';
import { removeEmptyFields } from '@/shared/utils/removeEmptyFields';

interface IFormValues {
  shop_name: string;
  site: string;
  instagram: string;
  links: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    shop_name: yup.string().required('Название магазина'),
    site: yup
      .string()
      .required('Сайт магазина')
      .url('Неправильный формат URL брат'),
    instagram: yup
      .string()
      .required('Instagram')
      .url('Неправильный формат URL брат'),
  });

interface Props {
  open: boolean;
  onClose: () => void;
}

const sellerClient = new SellerClient();

const EditShopInfoModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useAppSelector((state) => state.seller);

  const formik = useFormik<IFormValues>({
    initialValues: {
      shop_name: '',
      site: '',
      instagram: '',
      links: [],
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ links, ...others }: IFormValues) => {
      setIsLoading(true);

      if (isEqual(others, seller)) {
        onClose();
        return;
      }

      try {
        await sellerClient.changeInfoSeller(removeEmptyFields(others));
        await dispatch(fetchMe());
        await dispatch(fetchSeller());
        setIsLoading(false);
        onClose();
      } catch (error: any) {
        setIsLoading(false);
        if (error) {
          console.log(error);
        }
      }
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleAddSite = () => {
    const newLinks = [...formik.values.links, ''];
    formik.setFieldValue('links', newLinks);
  };

  const setSellerFieldsInfo = async () => {
    const values: IFormValues = {
      shop_name: seller?.shop_name || '',
      site: seller?.site || '',
      instagram: seller?.instagram || '',
      links: [],
    };

    formik.setValues(values);
  };

  useEffect(() => {
    setSellerFieldsInfo();
  }, [seller]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalInnerContainer>
        <HeaderTextsModalCont>
          <HeaderTextModal>Измените ваши данные</HeaderTextModal>
          <TextModal>
            Вы можете обновить ваши данные в любое время чтобы хранить ваш
            Shopper аккаунт защищенным.
          </TextModal>
        </HeaderTextsModalCont>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8 mt-9 max-h-80 overflow-y-scroll">
            <div className="flex flex-col gap-8">
              <TextField
                label={'Название магазина'}
                error={
                  formik.touched.shop_name && Boolean(formik.errors.shop_name)
                }
                errorMessage={
                  formik.touched.shop_name && formik.errors.shop_name
                    ? formik.errors.shop_name
                    : ''
                }
                value={formik.values.shop_name}
                onChange={formik.handleChange}
                name="shop_name"
              />

              <TextField
                label={'Сайт магазина'}
                error={formik.touched.site && Boolean(formik.errors.site)}
                errorMessage={
                  formik.touched.site && formik.errors.site
                    ? formik.errors.site
                    : ''
                }
                value={formik.values.site}
                onChange={formik.handleChange}
                name="site"
              />

              <TextField
                label={'Instagram'}
                error={
                  formik.touched.instagram && Boolean(formik.errors.instagram)
                }
                errorMessage={
                  formik.touched.instagram && formik.errors.instagram
                    ? formik.errors.instagram
                    : ''
                }
                value={formik.values.instagram}
                onChange={formik.handleChange}
                name="instagram"
              />

              {formik.values.links.map((link, index) => (
                <TextField
                  key={index}
                  label={`Ссылка #${index + 1}`}
                  value={link}
                  onChange={formik.handleChange}
                  name={`links.${index}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleAddSite}
              variant={BUTTON_STYLES.secondaryCtaIndigo}
              size="small"
              type="button"
              disabled={true}
            >
              <ButtonInfoCont>
                Добавить ссылку
                <PlusCircle />
              </ButtonInfoCont>
            </Button>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant={BUTTON_STYLES.primaryCtaIndigo} size="small">
              <ButtonInfoCont>
                Сохранить
                <LoaderIcon loading={isLoading} size={24} />
              </ButtonInfoCont>
            </Button>
          </div>
        </form>
      </ModalInnerContainer>
    </Modal>
  );
};

export default EditShopInfoModal;
