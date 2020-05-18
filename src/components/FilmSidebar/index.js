import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import './filmSidebar.css';

function FilmSidebar() {
  const { genres, crew, director, countries, time } = useSelector(
    (state) => state.details.film
  );
  console.log(countries);
  return (
    <ul className="Sidebar no-scrollbar">
      <li className="Sidebar__row">
        <h6 className="Sidebar__title">Ülke</h6>
        <div>
          {countries &&
            countries.map((c, i) => (
              <a href="/" className="Sidebar__text Sidebar__country" key={c}>
                {c.name}
              </a>
            ))}
        </div>
      </li>
      <li className="Sidebar__row">
        <h6 className="Sidebar__title">Tür</h6>
        <ul className="Sidebar__genres Sidebar__list">
          {genres &&
            genres.map(({ name, slug }, i) => (
              <li className="Sidebar__genre Sidebar__item" key={i}>
                <a href={`/${slug}`}>{name}</a>
              </li>
            ))}
        </ul>
      </li>
      {time && (
        <li className="Sidebar__row">
          <h6 className="Sidebar__title">Süre</h6>
          <span className="Sidebar__text">{time} dakika</span>
        </li>
      )}
      <li className="Sidebar__row">
        <h6 className="Sidebar__title">Yönetmen</h6>
        {director && (
          <a className="Sidebar__text" href={`/${director.slug}`}>
            {director.name}
          </a>
        )}
      </li>
      <li className="Sidebar__row Sidebar__row--row">
        <h6 className="Sidebar__title">Oyuncular</h6>
        <ul className="Sidebar__actors Sidebar__list">
          {crew &&
            crew.map(({ image, slug }, i) => (
              <li className="Sidebar__actor Sidebar__item" key={i}>
                <a href={`/${slug}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image}`}
                    alt={slug}
                    className="Sidebar__image"
                  />
                </a>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
}

export default memo(FilmSidebar);
