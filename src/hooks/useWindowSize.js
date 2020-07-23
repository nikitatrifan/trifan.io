import { useEffect, useState, useRef } from 'react';
import type { WindowSizeType } from '../types';

function getWindowSize(): WindowSizeType {
  return {
    windowWidth: parseInt(window.innerWidth, 10),
    windowHeight: parseInt(window.innerHeight, 10),
  };
}

export default function useWindowSize(): WindowSizeType {
  const [windowSize, setWindowSize] = useState(getWindowSize);
  const isMountedRef = useRef(false);

  useEffect((): Function => {
    isMountedRef.current = true;
    let timeout;
    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!isMountedRef.current) return;
        setWindowSize(getWindowSize());
      }, 200);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [false]);

  return windowSize;
}
