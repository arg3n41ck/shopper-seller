import { FC } from 'react';
import {
  CheckCircleIconCont,
  CheckIconBlock,
  HeaderText,
  SuccessActionCont,
  CheckBackground,
} from './styles';
import { Check } from 'react-feather';
import Button from '../../shared/ui/button';
import { Trans } from 'react-i18next';
import { SUCCESS } from '@/shared/lib/consts/styles';
import { PATH_AUTH } from '@/shared/routes/paths';
import { useRouter } from 'next/router';

const SuccessAction: FC = () => {
  const router = useRouter();
  const title = (router.query?.title as string) || '';
  const path = (router.query?.path as string) || '';

  const navigateToPersonalCabinet = () =>
    router.push({ pathname: path ? path : PATH_AUTH.root });

  return (
    <SuccessActionCont>
      <HeaderText>{title}</HeaderText>

      <CheckCircleIconCont>
        <CheckBackground />

        <CheckIconBlock>
          <Check size={80} color={SUCCESS[500]} />
        </CheckIconBlock>
      </CheckCircleIconCont>

      <Button onClick={navigateToPersonalCabinet}>
        <Trans i18nKey={'auth.authSuccessPage.toLKPage'} />
      </Button>
    </SuccessActionCont>
  );
};

export default SuccessAction;
