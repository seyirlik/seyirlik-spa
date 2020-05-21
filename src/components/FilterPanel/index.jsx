import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../../utils/http';
import queryString from 'query-string';
import './filterPanel.css';

function FilterPanel({ years, yearQuery, countryQuery, genresQuery, imdb }) {
  const location = useLocation();
  const [range, setRange] = useState(imdb);
  const [genres, setGenres] = useState([]);
  const [filterGenre, setFilter] = useState(
    Array.isArray(genresQuery) ? [...genresQuery] : [genresQuery]
  );
  const [year, setYear] = useState(yearQuery);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(countryQuery);
  useEffect(() => {
    http
      .get('/genre')
      .then((res) => setGenres(res.genres))
      .catch((err) => console.log(err.response.data.message));

    http
      .get('/country')
      .then((res) => setCountries(res.countries))
      .catch((err) => console.log(err.response.data.message));
  }, []);

  const addList = useCallback(
    (e, slug) => {
      if (filterGenre.includes(slug)) {
        setFilter(filterGenre.filter((_slug) => _slug !== slug));
      } else {
        setFilter([...filterGenre, slug]);
      }
      e.preventDefault();
    },
    [filterGenre]
  );
  const filterHandler = useCallback(() => {
    const querys = queryString.parse(location.search);

    if (range > 0) {
      querys.imdb = range;
    } else {
      delete querys.imdb;
    }

    if (filterGenre.length > 0) {
      querys.genres = filterGenre;
    } else {
      delete querys.genres;
    }

    if (country !== '0') {
      querys.country = country;
    } else {
      delete querys.country;
    }

    if (year !== '0') {
      querys.year = year;
    } else {
      delete querys.year;
    }

    window.location.href = `${location.pathname}?${queryString.stringify(
      querys
    )}`;
    // history.push({
    //   pathname: location.pathname,
    //   search: queryString.stringify(querys),
    // });
  }, [country, filterGenre, range, year, location.pathname, location.search]);

  return (
    <div className="Filters">
      <div className="Filters__item">
        <div
          className={`Filters__header ${
            range > 0 ? 'Filters__header--active' : ''
          }`}
          content={range > 0 ? '+' : '-'}
        >
          <h4 className="Filters__title">IMDB Puanı</h4>
          <span className="Filters__filter">{range}+</span>
        </div>
        <div className="Filters__panel">
          <input
            type="range"
            className="Filters__range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            min="0"
            max="10"
            step="0.1"
          />
        </div>
      </div>
      <div className="Filters__item">
        <div
          className={`Filters__header ${
            filterGenre.length > 0 ? 'Filters__header--active' : ''
          }`}
          content={filterGenre.length > 0 ? '+' : '-'}
        >
          <h4 className="Filters__title">Türler</h4>
          <span className="Filters__filter">{filterGenre.length} adet</span>
        </div>
        <div className="Filters__panel">
          {genres.map((genre) => (
            <button
              key={genre._id}
              onClick={(e) => addList(e, genre.slug)}
              className={` Filters__btn ${
                filterGenre.includes(genre.slug) ? 'Filters__btn--active' : ''
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <div className="Filters__item">
        <div
          className={`Filters__header ${
            year !== '0' ? 'Filters__header--active' : ''
          }`}
          content={year !== '0' ? '+' : '-'}
        >
          <h4 className="Filters__title">Yapım Yılı</h4>
          <span className="Filters__filter">
            <select
              className="Filters__select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="0">Seçilmedi</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
      <div className="Filters__item">
        <div
          className={`Filters__header ${
            country !== '0' ? 'Filters__header--active' : ''
          }`}
          content={country !== '0' ? '+' : '-'}
        >
          <h4 className="Filters__title">Ülke</h4>
          <span className="Filters__filter">
            <select
              className="Filters__select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="0">Seçilmedi</option>
              {countries.length > 0 &&
                countries.map((country) => (
                  <option key={country._id} value={country.slug}>
                    {country.name}
                  </option>
                ))}
            </select>
          </span>
        </div>
      </div>
      <button
        onClick={filterHandler}
        className="Filters__btn Filters__btn--active Filters__apply"
      >
        Uygula
      </button>
    </div>
  );
}
FilterPanel.defaultProps = {
  years: [
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ],
  yearQuery: '0',
  countryQuery: '0',
  genresQuery: [],
  imdb: 0,
};

export default memo(FilterPanel);
