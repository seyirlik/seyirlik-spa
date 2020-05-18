import React, { useState, useEffect } from 'react';
import http from '../utils/http';
import { useHistory, useLocation } from 'react-router-dom';
const RandomFilm = () => {
  const location = useLocation();
  const [slug, setSlug] = useState('');
  const history = useHistory();

  useEffect(() => {
    getSlug();
    async function getSlug() {
      const data = await http.get('/film/random');
      setSlug(data.film.slug);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      history.replace({
        pathname: `/f/${slug}`,
        state: { background: location },
      });
    }
  }, [slug, history, location]);

  return (
    <div className="loading-overlay">
      <h1 className="loading">Random Film Getiriliyor...</h1>
    </div>
  );
};

export default RandomFilm;
