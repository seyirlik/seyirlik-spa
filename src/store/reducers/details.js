import * as actions from '../actions/details';

const initialState = {
  film: {},
  comments: [],
  pagination: {},
  totalPage: 0,
  totalCount: 0,
  inList: false,
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
        inList: action.inList,
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
    case actions.SET_IN_LIST:
      return {
        ...state,
        inList: action.inList,
      };
    default:
      return state;
  }
}
