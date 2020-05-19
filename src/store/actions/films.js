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

export const FILTER_CHANGE = 'FILTER_CHANGE';
export const setFilter = (filter) => ({ type: FILTER_CHANGE, filter });
