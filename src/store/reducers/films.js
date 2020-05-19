import * as actions from '../actions/films';
const initialState = {
  films: [],
  pagination: {},
  maxPage: 0,
  view: 0, // 0 list 1 grid
};

export default function films(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        films: action.films,
        pagination: action.pagination,
        maxPage: action.maxPage,
      };
    case actions.MORE_DATA:
      return {
        ...state,
        films: [...state.films, ...action.films],
        pagination: action.pagination,
      };
    case actions.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case actions.FILTER_DATA:
      return {
        ...state,
        films: action.films,
      };
    default:
      return state;
  }
}
