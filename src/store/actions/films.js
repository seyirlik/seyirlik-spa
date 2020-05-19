export const SET_VIEW = 'SET_VIEW';
export const setView = (view) => ({ type: SET_VIEW, payload: view });

export const SET_DATA = 'SET_DATA';
export const setData = (films, pagination, maxPage) => ({
  type: SET_DATA,
  films,
  pagination,
  maxPage,
});

export const MORE_DATA = 'MORE_DATA';
export const setMoreData = (films, pagination, maxPage) => ({
  type: MORE_DATA,
  films,
  pagination,
});

export const getFilms = (
  page,
  limit,
  imdb,
  sortBy,
  country,
  year,
  genres,
  more = false
) => (dispatch, _, http) => {
  return http
    .get('/film', {
      params: { page, limit, imdb, sortBy, country, year, genres },
    })
    .then((res) => {
      if (!more) {
        dispatch(setData(res.films, res.pagination, res.maxPage));
      } else {
        dispatch(setMoreData(res.films, res.pagination));
      }
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

export const filterData = (filter) => (dispatch, getState, _) => {
  const { films } = getState().films;

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
  } else {
    films.sort((film, film2) => {
      const filmName = film.local_name.toUpperCase();
      const film2Name = film2.local_name.toUpperCase();
      if (filmName < film2Name) return -1;
      else if (filmName > film2Name) return 1;

      return 0;
    });
  }
  dispatch(filteredData(films));
};
export const FILTER_DATA = 'FILTER_DATA';
export const filteredData = (films) => ({ type: FILTER_DATA, films });
