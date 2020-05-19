import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getFilms } from '../store/actions/films';
import Layout from '../layouts/Layout';
import FilterPanel from '../components/FilterPanel';
import Film from '../components/Film';
import LazyImageObserver from '../hoc/LazyImageObserver';
import Loader from '../components/Loader';
import queryString from 'query-string';
import Sort from '../components/Sort';
import Modal from '../layouts/Modal';
import FilmPoster from '../components/FilmPoster';

const AdviceRobot = () => {
  const dispatch = useDispatch();
  const { films, pagination, view } = useSelector((state) => state.films);
  const {
    page = 1,
    limit = 10,
    sortBy,
    country,
    year,
    genres,
    imdb,
  } = queryString.parse(useLocation().search);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(
      getFilms(page, limit, imdb, sortBy, country, year, genres)
    ).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function fetchMoreFilm() {
    setLoading(true);
    dispatch(
      getFilms(
        pagination.nextPage.page,
        limit,
        imdb,
        sortBy,
        country,
        year,
        genres,
        true
      )
    ).then(() => setLoading(false));
  }
  return (
    <LazyImageObserver data={films}>
      <Sort showModal={() => setShowFilterModal(true)} />
      <main className="flex-wrapper">
        <section
          className={`flex--large bg-transparent custom-scrollbar ${
            loading ? 'placeholder-loading' : ''
          }`}
        >
          {films &&
            films.map((film) => {
              return !view ? (
                <FilmPoster film={film} key={film._id} />
              ) : (
                <Film film={film} showLinks={false} key={film._id} />
              );
            })}
          {!loading && pagination.nextPage && (
            <Loader callback={fetchMoreFilm} />
          )}
        </section>
        <aside className="flex--small bg-transparent custom--scrollbar tablet-hidden">
          <FilterPanel
            yearQuery={year}
            countryQuery={country}
            genresQuery={genres}
            imdb={imdb}
          />
        </aside>
      </main>
      <Modal
        isActive={showFilterModal}
        closeModal={() => setShowFilterModal(false)}
      >
        <FilterPanel
          yearQuery={year}
          countryQuery={country}
          genresQuery={genres}
          imdb={imdb}
        />
      </Modal>
    </LazyImageObserver>
  );
};

export default Layout(AdviceRobot);
