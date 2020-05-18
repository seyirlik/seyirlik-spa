import { toast } from 'react-toastify';

export const SET_DATA = 'SET_DATA';
export const NEW_COMMENT = 'NEW_COMMENT';
export const MORE_COMMENT = 'MORE_COMMENT';
export const setData = (film, comments, pagination, totalPage, totalCount) => {
  return {
    type: SET_DATA,
    film,
    comments,
    pagination,
    totalPage,
    totalCount,
  };
};
export const getFilmDetails = (slug, page = 1) => (dispatch, _, http) => {
  return http
    .get(`/film/${slug}`, { params: { page } })
    .then((res) => {
      const {
        film,
        comments: { pagination, results, totalPage, totalCount },
      } = res;
      dispatch(setData(film, results, pagination, totalPage, totalCount));
    })
    .catch((err) => {
      toast.warn(err.response.data.message);
      // Todo throw 404 error
    });
};
export const addComment = (newComment) => ({ type: NEW_COMMENT, newComment });
export const newComment = (content, spoiler) => (dispatch, getState, http) => {
  const { _id } = getState().details.film;
  return http
    .post('/comment/new', {
      film: _id,
      content,
      spoiler,
    })
    .then((res) => {
      const { user } = getState().auth;
      const newComment = {
        ...res.comment,
        user,
      };
      dispatch(addComment(newComment));
      return true;
    })
    .catch((err) => {
      toast.warn('Opps! Bir sorun oluştu: ' + err.response.data.message);
      console.log(err.response);
      return false;
    });
};

export const moreComment = (comments, pagination, totalPage, totalCount) => ({
  type: MORE_COMMENT,
  comments,
  pagination,
  totalPage,
  totalCount,
});

export const getMoreComment = (page) => (dispatch, getState, http) => {
  const { slug } = getState().details.film;
  return http
    .get(`/comment/more/${slug}`, { params: { page } })
    .then((res) => {
      const {
        comments: { results, pagination, totalPage, totalCount },
      } = res;
      dispatch(moreComment(results, pagination, totalPage, totalCount));
    })
    .catch((err) => {
      console.log(err.response.data.message);
      return false;
    });
};
