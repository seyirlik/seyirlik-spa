import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../hoc/Layout';
import FilmPoster from '../components/FilmPoster';
import http from '../utils/http';

function Profile(props) {
  const { nick } = useParams();
  const [films, setFilms] = React.useState([]);

  React.useEffect(() => {
    http
      .get(`/user/${nick}/list`)
      .then((res) => {
        if (res.success) {
          setFilms(res.list);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  return (
    <main className="flex-wrapper">
      <section className={`flex--large bg-transparent custom-scrollbar `}>
        {films &&
          films.map((film) => <FilmPoster film={film} key={film._id} />)}
      </section>
      <aside className={`flex--small bg-transparent`}>Yan</aside>
    </main>
  );
}

export default Layout(Profile);
