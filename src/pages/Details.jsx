import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFilmDetails,
  getMoreComment,
  setInList,
} from '../store/actions/details';
import Layout from '../hoc/Layout';
import Film from '../components/Film';
import FilmSidebar from '../components/FilmSidebar';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Loader from '../components/Loader';
import http from '../utils/http';
import { toast } from 'react-toastify';

const Details = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { film, comments, pagination, totalCount, inList } = useSelector(
    (state) => state.details
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFilmDetails(slug)).then(() => {
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

  const addListHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!isAuthenticated) {
        toast.info('Giriş Yapmalısınız!');
        return false;
      }

      // TODO add control statement in list  or not
      if (inList) {
        http
          .get(`/user/removeFromList/${film._id}`)
          .then((res) => {
            if (res.success) {
              toast.info('Listenizden çıkarıldı');
              dispatch(setInList(false));
            }
          })
          .catch((err) => {
            toast.warn(err.response.data.message);
          });
      } else {
        http
          .post('/user/addToList', { film: film._id })
          .then((res) => {
            if (res.success) {
              toast.success('Listenize eklendi');
              dispatch(setInList(true));
            }
          })
          .catch((err) => {
            toast.warn(err.response.data.message);
          });
      }
    },
    [film, dispatch, inList, isAuthenticated]
  );

  return (
    <main className="flex-wrapper">
      <section
        className={`flex--large bg-transparent custom-scrollbar ${
          loading ? 'placeholder-loading' : ''
        }`}
      >
        {film && (
          <React.Fragment>
            <Film film={film} showActions>
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
                  <a
                    href="/"
                    onClick={addListHandler}
                    title={
                      inList ? 'Film Listemden Çıkar' : 'Film Listeme Ekle'
                    }
                  >
                    {inList ? '- Listemden Çıkar' : '+ Listeme Ekle'}
                  </a>
                </li>
              </ul>
            </Film>
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
