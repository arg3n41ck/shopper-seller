import { useMemo } from 'react';
import { useRouter, NextRouter } from 'next/router';

interface UseQueryReturnType {
  router: NextRouter;
  query: NextRouter['query'];
}

const useQuery = (): UseQueryReturnType => {
  const router = useRouter();
  const { query } = router;
  return useMemo(() => ({ router, query }), [query, router]);
};

export default useQuery;
