import { useEffect } from 'react';
import { useAtom } from "jotai/react";
import { lockscreenAtom } from "./lockscreenAtom";

export default function usePageVisibility() {
  const [_, setIsVisible] = useAtom(lockscreenAtom);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible');
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

