import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import http from '../../utils/http';
import './film.css';

function Film({ film, showActions, showLinks }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const addListHandler = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info('Giriş Yapmalısınız!');
      return false;
    }

    // TODO add control statement in list  or not
    http
      .post('/user/addToList', { film: film._id })
      .then((res) => {
        if (res.success) toast.success('Listenize eklendi');
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });

    // http
    //   .get(`/user/removeFromList/${film._id}`)
    //   .then((res) => {
    //     if (res.success) toast.info('Listenizden çıkarıldı');
    //   })
    //   .catch((err) => {
    //     toast.warn(err.response.data.message);
    //   });
  };

  function FilmLinks({ className }) {
    return (
      <ul className={`Film__links ${className}`}>
        {film.google && (
          <li className="Film__link">
            <a
              href={`https://play.google.com/store/movies/details/${film.google}&gl=TR`}
              target="_blank"
              rel="noopener noreferrer"
              title="Google Filmler"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="Film__google"
              >
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
              </svg>
            </a>
          </li>
        )}
        {film.netflix && (
          <li className="Film__link">
            <a
              href={`https://www.netflix.com/tr/title/${film.netflix}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Netflix"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="Film__netflix"
              >
                <path d="M6.5 2h4l2.94 8.83L13.5 2h4v20c-1.25-.22-2.63-.36-4.09-.42L10.5 13l-.07 8.59c-1.4.06-2.73.2-3.93.41V2z" />
              </svg>
            </a>
          </li>
        )}
        {film.apple && (
          <li className="Film__link">
            <a
              href={`https://itunes.apple.com/tr/movie/${film.apple}?l=tr`}
              target="_blank"
              rel="noopener noreferrer"
              title="iTunes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="Film__apple"
              >
                <path d="M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997l.33-1.006l2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932c.14.182.396.264.75.264c.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366c-.017.042-.248.842-.808 1.658c-.487.71-.99 1.418-1.79 1.435c-.783.016-1.03-.462-1.93-.462c-.89 0-1.17.445-1.913.478c-.758.025-1.344-.775-1.838-1.484c-.998-1.451-1.765-4.098-.734-5.88c.51-.89 1.426-1.451 2.416-1.46c.75-.016 1.468.512 1.93.512c.461 0 1.327-.627 2.234-.536c.38.016 1.452.157 2.136 1.154c-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864c-.585.025-1.294.388-1.723.883c-.38.437-.71 1.138-.619 1.806c.652.05 1.328-.338 1.732-.825z" />
              </svg>
            </a>
          </li>
        )}
      </ul>
    );
  }
  return (
    <section className="Film">
      <div className="Film__left">
        <a href={`/f/${film.slug}`} title={film.local_name}>
          <img
            src={`${film.poster}`}
            alt={film.local_name}
            className="Film__poster lazy-image"
          />
        </a>
        {showActions && (
          <ul className="Film__actions">
            <li className="Film__action">
              <a
                href="/"
                title="Filmin fragmanını izle"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fragman
              </a>
            </li>
            <li className="Film__action Film__action--bold">
              <a href="/" onClick={addListHandler} title="Film Listeme Ekle">
                + Listeme Ekle
              </a>
            </li>
          </ul>
        )}
        {!showActions && showLinks && <FilmLinks />}
      </div>
      <article className="Film__right">
        <header className="Film__header">
          <h2>
            <a href={`/f/${film.slug}`}>
              {film.local_name} ({film.year && film.year.split('-')[0]})
            </a>
          </h2>
          <a
            className="Film__score"
            href={`https://www.imdb.com/title/${film.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="IMDB"
          >
            <span>
              {film.imdb_score > 0 ? film.imdb_score : 'Puanlanmamış'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1536 1536"
              className="Film__imdb"
            >
              <path d="M922 669v182q0 4 .5 15t0 15l-1.5 12l-3.5 11.5l-6.5 7.5l-11 5.5l-16 1.5V610q9 0 16 1t11 5t6.5 5.5t3.5 9.5t1 10.5V669zm316 96v121q0 1 .5 12.5t0 15.5t-2.5 11.5t-7.5 10.5t-13.5 3q-9 0-14-9q-4-10-4-165v-24.5l1.5-8.5l3.5-7l5-5.5l8-1.5q6 0 10 1.5t6.5 4.5t4 6t2 8.5t.5 8V765zM180 1001h122V529H180v472zm434 0h106V529H561l-28 221q-20-148-32-221H343v472h107V689l45 312h76l43-319v319zm425-305q0-67-5-90q-3-16-11-28.5t-17-20.5t-25-14t-26.5-8.5t-31-4t-29-1.5H762v472h56q169 1 197-24.5t25-180.5q-1-62-1-100zm317 197V760q0-29-2-45t-9.5-33.5t-24.5-25t-46-7.5q-46 0-77 34V529h-117v472h110l7-30q30 36 77 36q50 0 66-30.5t16-83.5zm180-733v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1216q66 0 113 47t47 113z" />
            </svg>
          </a>
        </header>
        <div className="Film__overview--column">
          {showActions && <FilmLinks className="Film__links--bottom" />}
          <p className="Film__overview">{film.overview}</p>
        </div>
      </article>
    </section>
  );
}
Film.defaultProps = {
  showActions: false,
  showLinks: true,
};
export default Film;
