import React from 'react';

function FilmPoster({ film }) {
  return (
    <a href={`/f/${film.slug}`} key={film._id}>
      <img
        src={film.poster}
        alt={film.local_name}
        height="260"
        width="180"
        className="lazy-image"
        onError={(e) =>
          (e.target.src =
            'https://developers.google.com/maps/documentation/maps-static/images/error-image-generic.png?hl=tr')
        }
      />
    </a>
  );
}

export default FilmPoster;
