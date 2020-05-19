import * as actions from '../actions/films';
const initialState = {
  films: [],
  pagination: {},
  maxPage: 0,
  filter: '',
  view: 0, // 1 list 0 grid
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
    case actions.FILTER_CHANGE:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}
