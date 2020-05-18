import React, { useRef, useCallback, useEffect } from 'react';

function Loader({ callback }) {
  const loader = useRef(null);

  const loaderCallback = useCallback(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
        if (loader.current) {
          loader.current.unobserve(entry.target);
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    if (loader.current == null) {
      loader.current = new IntersectionObserver(loaderCallback, {
        root: null,
        rootMargin: '-20px',
      });
    }

    if (loader && loader.current) {
      loader.current.observe(loader.current);
    }

    return () => {
      loader.current.unobserve(loader.current);
    };
  }, [loaderCallback]);

  return <div ref={loader} style={{ height: '1px' }}></div>;
}

export default Loader;
