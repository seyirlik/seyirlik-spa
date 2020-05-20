import React, { useEffect, useCallback, useRef } from 'react';

function LazyImageObserver(props) {
  let observer = useRef(null);

  const imageCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const source = entry.target.dataset.src;
        if (source) {
          entry.target.src = source;
          entry.target.classList.remove('lazy-image');
        }
        observer.current.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    if (observer.current == null) {
      observer.current = new IntersectionObserver(imageCallback, {
        rootMargin: '0px 0px -20px 0px',
        root: null,
      });
    }

    const images = document.querySelectorAll('.lazy-image');

    images.forEach((image) => observer.current.observe(image));

    return () => {
      images.forEach((image) => observer.current.unobserve(image));
    };
  }, [props.data, imageCallback]);

  return <>{props.children}</>;
}

export default LazyImageObserver;
