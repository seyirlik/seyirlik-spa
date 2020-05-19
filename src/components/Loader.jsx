import React, { useRef, useCallback, useEffect } from 'react';

function Loader({ callback }) {
  const loader = useRef(null);
  const observer = useRef(null);
  const loaderCallback = useCallback(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
        if (observer.current) {
          observer.current.unobserve(entry.target);
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    if (observer.current == null) {
      observer.current = new IntersectionObserver(loaderCallback, {
        root: null,
        rootMargin: '-20px',
      });
    }

    if (loader && loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      observer.current.unobserve(loader.current);
    };
  }, [loaderCallback]);

  return <div ref={loader} style={{ height: '1px' }}></div>;
}

export default Loader;
