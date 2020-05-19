import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import './filmSidebar.css';

function FilmSidebar() {
  const { genres, crew, director, countries, time } = useSelector(
    (state) => state.details.film
  );

  return (
    <ul className="Sidebar no-scrollbar">
      <li className="Sidebar__row">
        <h6 className="Sidebar__title">Ülke</h6>
        <div>
          {countries &&
            countries.map((country) => (
              <a
                href={`/tavsiye-robotu?country=${country.slug}`}
                className="Sidebar__text Sidebar__country"
                key={country._id}
                title={country.name}
              >
                {country.name}
              </a>
            ))}
        </div>
      </li>
      {genres && (
        <li className="Sidebar__row">
          <h6 className="Sidebar__title">Tür</h6>
          <ul className="Sidebar__genres Sidebar__list">
            {genres.map(({ _id, name, slug }) => (
              <li className="Sidebar__genre Sidebar__item" key={_id}>
                <a
                  href={`/tavsiye-robotu?genres=${slug}`}
                  title={`${name} türünde`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )}
      {time && (
        <li className="Sidebar__row">
          <h6 className="Sidebar__title">Süre</h6>
          <span className="Sidebar__text">{time} dakika</span>
        </li>
      )}
      {director && (
        <li className="Sidebar__row">
          <h6 className="Sidebar__title">Yönetmen</h6>
          <a
            className="Sidebar__text"
            href={`/${director.slug}`}
            title={director.name}
          >
            {director.name}
          </a>
        </li>
      )}
      {crew && (
        <li className="Sidebar__row Sidebar__row--row">
          <h6 className="Sidebar__title">Oyuncular</h6>
          <ul className="Sidebar__actors Sidebar__list">
            {crew.map(({ name, image, slug }, i) => (
              <li className="Sidebar__actor Sidebar__item" key={i}>
                <a href={`${slug}`} title={name}>
                  <img src={image} alt={slug} className="Sidebar__image" />
                </a>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
}

export default memo(FilmSidebar);
