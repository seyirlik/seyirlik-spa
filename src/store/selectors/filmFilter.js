import { createSelector } from 'reselect';

const getFilms = (state) => state.films.films;
const getFilter = (state) => state.films.filter;

export const getFilteredFilms = createSelector(
  [getFilms, getFilter],
  (films, filter) => {
    if (filter === '-imdb') {
      films.sort((film, film2) => {
        if (film.imdb_score > film2.imdb_score) return -1;
        else if (film.imdb_score < film2.imdb_score) return 1;

        return 0;
      });
    } else if (filter === '+imdb') {
      films.sort((film, film2) => {
        if (film.imdb_score < film2.imdb_score) return -1;
        else if (film.imdb_score > film2.imdb_score) return 1;

        return 0;
      });
    } else if (filter === '-name') {
      films.sort((film, film2) => {
        const filmName = film.local_name.toUpperCase();
        const film2Name = film2.local_name.toUpperCase();
        if (filmName > film2Name) return -1;
        else if (filmName < film2Name) return 1;

        return 0;
      });
    } else if (filter === '+name') {
      films.sort((film, film2) => {
        const filmName = film.local_name.toUpperCase();
        const film2Name = film2.local_name.toUpperCase();
        if (filmName < film2Name) return -1;
        else if (filmName > film2Name) return 1;

        return 0;
      });
    }

    return films;
  }
);
