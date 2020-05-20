import React from 'react';
import './filmPoster.css';

function FilmPoster({ film }) {
  return (
    <a
      href={`/f/${film.slug}`}
      key={film._id}
      className="film-link"
      title={film.local_name}
    >
      <img
        src={film.poster}
        alt={film.local_name}
        className="film-poster lazy-image"
        onError={(e) =>
          (e.target.src =
            'https://developers.google.com/maps/documentation/maps-static/images/error-image-generic.png?hl=tr')
        }
      />
    </a>
  );
}

export default FilmPoster;
