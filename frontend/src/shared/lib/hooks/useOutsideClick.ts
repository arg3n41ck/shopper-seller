import { useEffect, useCallback, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    },
    [ref, handler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOutsideClick;
