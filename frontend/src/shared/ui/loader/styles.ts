import styled, { keyframes } from 'styled-components';
import { Loader } from 'react-feather';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const AnimatedLoader = styled(Loader)`
  animation: ${spin} 2s linear infinite;
`;
