import { useEffect } from "react";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [locked]);
}