import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFilmDetails, getMoreComment } from '../store/actions/details';
import Layout from '../layouts/Layout';
import Film from '../components/Film';
import FilmSidebar from '../components/FilmSidebar';
import CommentForm from '../components/CommentForm';
import CommentList from '../layouts/CommentList';
import Loader from '../components/Loader';

const Details = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { film, comments, pagination, totalCount } = useSelector(
    (state) => state.details
  );

  useEffect(() => {
    dispatch(getFilmDetails(slug, page)).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, slug]);

  useEffect(() => {
    if (page > 1) {
      dispatch(getMoreComment(page));
    }
  }, [page, dispatch]);

  function increasePage() {
    const newPage = pagination.nextPage ? pagination.nextPage.page : page + 1;
    setPage(newPage);
  }

  return (
    <main className="flex-wrapper">
      <section
        className={`flex--large bg-transparent custom-scrollbar ${
          loading ? 'placeholder-loading' : ''
        }`}
      >
        {film && (
          <React.Fragment>
            <Film film={film} showActions />
            <div className="comment-container" style={{ marginTop: 20 }}>
              <CommentForm />
              <CommentList comments={comments} totalCount={totalCount} />
              {!loading && pagination.nextPage && (
                <Loader callback={increasePage} />
              )}
            </div>
          </React.Fragment>
        )}
      </section>
      <aside
        className={`flex--small bg-transparent ${
          loading ? 'placeholder-loading' : ''
        }`}
      >
        {film && <FilmSidebar />}
      </aside>
    </main>
  );
};

export default Layout(Details);
