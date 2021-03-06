import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getFilteredFilms } from '../store/selectors/filmFilter';
import { useLocation } from 'react-router-dom';
import { getFilms } from '../store/actions/films';
import withLayout from '../hoc/Layout';
import FilterPanel from '../components/FilterPanel';
import Film from '../components/Film';
import LazyImageObserver from '../hoc/LazyImageObserver';
import Loader from '../components/Loader';
import queryString from 'query-string';
import Sort from '../components/Sort';
import Modal from '../hoc/Modal';
import FilmPoster from '../components/FilmPoster';

const AdviceRobot = () => {
  const dispatch = useDispatch();
  const { pagination, view } = useSelector((state) => state.films);
  const films = useSelector(getFilteredFilms);
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
    <LazyImageObserver data={[films, view]}>
      <Helmet>
        <title>Tavsiye Robotu | Film Arşivi</title>
        <meta
          name="description"
          content="Film ara,imdb puanı,ülke,yıl,kategori filtrelemesi yaparak moduna göre film bul."
        />
        <meta
          name="keywords"
          content="film ara,film filtere,ne izlesem,imdb puanına göre filmler,yıla göre filmler,türe göre filmler"
        />
        <meta
          property="og:url"
          content={`https://seyirlik.herokuapp.com/tavsiye-robotu`}
        />
        <meta property="og:title" content="Tavsiye Robotu" />
        <meta
          property="og:description"
          content="Filmleri oyuncu,imdb puanı,yılı ve türlerine göre filtereleyerek zevkine uygun film bul"
        />
        <meta
          name="twitter:url"
          content={`https://seyirlik.herokuapp.com/tavsiye-robotu`}
        />
        <meta name="twitter:title" content="Tavsiye Robotu" />
        <meta
          name="twitter:description"
          content="Filmleri oyuncu,imdb puanı,yılı ve türlerine göre filtereleyerek zevkine uygun film bul"
        />
      </Helmet>
      <Sort showModal={() => setShowFilterModal(true)} />
      <main className="flex-wrapper">
        <section
          className={`flex--large bg-transparent custom-scrollbar ${
            loading ? 'placeholder-loading' : ''
          }`}
        >
          {films &&
            films.map((film) => {
              return view === 0 ? (
                <FilmPoster film={film} key={film._id} />
              ) : (
                <Film
                  film={film}
                  showLinks={false}
                  lazy={true}
                  key={film._id}
                />
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

export default withLayout(AdviceRobot);
