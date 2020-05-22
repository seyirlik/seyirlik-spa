import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../hoc/Layout';
import LazyImageObserver from '../hoc/LazyImageObserver';
import FilmPoster from '../components/FilmPoster';
import http from '../utils/http';
import { USER_IMAGE_URL } from '../utils/constants';

function Profile() {
  const { nick, actor } = useParams();
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (nick) {
      http
        .get(`/user/${nick}`)
        .then((res) => {
          if (res.success) {
            setUser(res.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            window.location.href = `/hata?message=${err.response.data.message}`;
          }
        });
    } else if (actor) {
      http
        .get(`/actor/${actor}`)
        .then((res) => {
          if (res.success) {
            const user = {
              nick: res.actor.name,
              profile_image: res.actor.image,
              bio: res.actor.bio,
              list: res.films,
            };
            console.log(user);
            setUser(user);
            setLoading(false);
          }
        })
        .catch((err) => {
          // if (err.response.status === 404) {
          // window.location.href = `/hata?message=${err.response.data.message}`;
          // }
          console.log(err);
        });
    }
  }, [nick, actor]);

  return (
    <main className="flex-wrapper">
      <Helmet>
        <title>{nick}</title>
        <meta
          name="description"
          content={`${nick} kullanıcısının profili,film listesi`}
        />
        <meta
          name="keywords"
          content={`${nick},${nick} profili,${nick} filmleri,${nick} film listesi`}
        />
        <meta
          property="og:url"
          content={`https://seyirlik.herokuapp.com/u/${nick}`}
        />
        <meta property="og:title" content={`${nick} profili`} />
        <meta
          property="og:description"
          content={`${nick} kullanıcısının profili`}
        />
        <meta
          name="twitter:url"
          content={`https://seyirlik.herokuapp.com/u/${nick}`}
        />
        <meta name="twitter:title" content={`${nick} profili`} />
        <meta
          name="twitter:description"
          content={`${nick} kullanıcısının profili`}
        />
      </Helmet>
      <aside
        className={`flex--small bg-transparent`}
        style={{
          padding: '20px',
          marginLeft: '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: '15px',
          }}
        >
          <img
            src={`${
              nick ? USER_IMAGE_URL + user.profile_image : user.profile_image
            }`}
            alt={nick}
            style={{ width: '50px', height: '50px' }}
          />
          <div
            style={{
              marginLeft: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h2>{user.nick}</h2>
            {user.createdAt && (
              <time style={{ marginLeft: '5px' }}>
                ({new Date(user.createdAt).toLocaleDateString()})
              </time>
            )}
          </div>
        </div>
        {user.bio && <p>{user.bio}</p>}
      </aside>
      <section
        className={`flex--large bg-transparent custom-scrollbar `}
        style={{ flex: 1, position: 'relative' }}
      >
        <LazyImageObserver data={loading}>
          {loading && (
            <div className="loading-overlay">
              <span className="loading"></span>
            </div>
          )}
          {!loading && user ? (
            user.list.map((film) => <FilmPoster film={film} key={film._id} />)
          ) : (
            <p>Henüz Film Eklenmemiş</p>
          )}
        </LazyImageObserver>
      </section>
    </main>
  );
}

export default Layout(Profile);
