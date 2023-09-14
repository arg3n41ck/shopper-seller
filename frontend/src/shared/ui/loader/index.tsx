import { FC } from 'react';
import { AnimatedLoader } from './styles';

interface LoaderProps {
  loading: boolean;
  size?: number | string;
}

const LoaderIcon: FC<LoaderProps> = ({ loading, size }) => {
  if (!loading) return null;

  return (
    <div>
      <AnimatedLoader size={size} />
    </div>
  );
};

export default LoaderIcon;
