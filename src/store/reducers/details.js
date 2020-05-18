import * as actions from '../actions/details';

const initialState = {
  film: {},
  comments: [],
  pagination: {},
  totalPage: 0,
  totalCount: 0,
};

export default function detailsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        film: action.film,
        comments: action.comments,
        pagination: action.pagination,
        totalPage: action.totalPage,
        totalCount: action.totalCount,
      };
    case actions.MORE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
        pagination: action.pagination,
        totalPage: action.totalPage,
        totalCount: action.totalCount,
      };
    case actions.NEW_COMMENT:
      return {
        ...state,
        comments: [action.newComment, ...state.comments],
      };
    default:
      return state;
  }
}
