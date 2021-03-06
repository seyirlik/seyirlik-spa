import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView, setFilter } from '../../store/actions/films';
const styles = {
  btn: {
    marginLeft: '20px',
    fontSize: '26px',
  },
  panel: {
    maxWidth: '1117px',
    width: '100%',
    flex: '1 1',
  },
};

function SortPanel() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.films.filter);

  const sortHandler = useCallback(
    (sortBy) => {
      const filterSign = filter.charAt(0) === '-' ? '+' : '-';
      dispatch(setFilter(filterSign + sortBy));
    },
    [dispatch, filter]
  );

  return (
    <div className="Sort" style={styles.panel}>
      <button
        className="reset-btn Sort__btn"
        style={styles.btn}
        onClick={() => sortHandler('name')}
        aria-label="İsme göre sırala"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.742 22.537H9.43V1.543A1.106 1.106 0 008.325.438H6.117a1.104 1.104 0 00-1.105 1.105v20.994H1.699a1.104 1.104 0 00-.779 1.886l5.521 6.629a1.105 1.105 0 001.562 0l5.522-6.63a1.107 1.107 0 00-.783-1.885zm16.566-4.42h-8.835a1.104 1.104 0 00-1.105 1.105v2.21a1.104 1.104 0 001.105 1.105h3.865l-4.228 4.865a2.211 2.211 0 00-.74 1.653v1.218a1.106 1.106 0 001.104 1.105h8.836a1.104 1.104 0 001.105-1.105V28.06a1.106 1.106 0 00-1.105-1.106h-3.866l4.228-4.865a2.21 2.21 0 00.741-1.653V19.22a1.106 1.106 0 00-1.105-1.102zm2.144-5.897l-4.09-11.048a1.105 1.105 0 00-1.04-.734h-2.86a1.105 1.105 0 00-1.041.734L18.33 12.22a1.105 1.105 0 001.04 1.476h1.713a1.104 1.104 0 001.051-.765l.305-.892h4.901l.305.892a1.106 1.106 0 001.055.765h1.715a1.103 1.103 0 001.04-1.476h-.003zm-7.693-4.048l1.125-3.315 1.124 3.315h-2.249z"
            fill="#fff"
          />
        </svg>
      </button>
      <button
        className="reset-btn Sort__btn"
        style={styles.btn}
        onClick={() => sortHandler('imdb')}
        aria-label="İmdb puanına göre sırala"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.125 5.372h1.151v4.583h-1.145a1.145 1.145 0 00-1.146 1.146v2.292a1.146 1.146 0 001.146 1.146h6.866a1.146 1.146 0 001.145-1.146v-2.292a1.146 1.146 0 00-1.145-1.146H27.85V1.939A1.146 1.146 0 0026.706.793h-3.43a1.145 1.145 0 00-1.023.633l-1.146 2.292a1.147 1.147 0 001.024 1.66l-.006-.006zm1.872 11.672a5.653 5.653 0 00-3.935 3.88 5.753 5.753 0 004.928 7.342c-.45.38-.953.69-1.493.924a1.18 1.18 0 00-.586 1.457l.702 1.431a1.133 1.133 0 001.496.703c4.158-1.772 6.179-4.41 6.179-9.451v-.77a5.748 5.748 0 00-4.672-5.633 5.74 5.74 0 00-2.619.111v.006zm1.565 6.952a1.43 1.43 0 110-2.86 1.43 1.43 0 010 2.86zm-12.598-.28H9.527V1.935A1.147 1.147 0 008.377.788H6.092a1.145 1.145 0 00-1.146 1.146v21.77H1.511a1.145 1.145 0 00-.808 1.955l5.726 6.875a1.145 1.145 0 001.62 0l5.726-6.875a1.148 1.148 0 00-.811-1.955v.01z"
            fill="#fff"
          />
        </svg>
      </button>
      {/* grid button */}
      <button
        className="reset-btn Sort__btn"
        style={styles.btn}
        onClick={() => dispatch(setView(0))}
        aria-label="Sadece Poster"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.13.625v12.854h12.85V.626H.13zm21.413 0v12.854h12.849V.626H21.543zM.131 22.048v12.854h12.848V22.048H.131zm21.412 0v12.854h12.849V22.048H21.543z"
            fill="#fff"
          />
        </svg>
      </button>
      {/* list button */}
      <button
        className="reset-btn Sort__btn"
        style={styles.btn}
        onClick={() => dispatch(setView(1))}
        aria-label="Detaylı Bilgi Göster"
      >
        <svg
          width="1.2em"
          height="1em"
          viewBox="0 0 43 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.598.625a3.952 3.952 0 00-3.88 4.727A3.956 3.956 0 006.11 8.236a3.954 3.954 0 002.14-5.169A3.954 3.954 0 004.599.625zm0 13.184A3.952 3.952 0 00.72 18.536a3.956 3.956 0 005.39 2.883 3.954 3.954 0 002.141-5.169 3.955 3.955 0 00-3.653-2.441zm0 13.183A3.952 3.952 0 00.72 31.72a3.956 3.956 0 005.39 2.883 3.954 3.954 0 001.284-6.452A3.953 3.953 0 004.6 26.992h-.001zm36.896 1.32H15.14a1.32 1.32 0 00-1.319 1.317v2.637a1.32 1.32 0 001.319 1.319h26.354a1.318 1.318 0 001.317-1.32V29.63a1.32 1.32 0 00-1.317-1.318zm0-26.368H15.14a1.317 1.317 0 00-1.317 1.32v2.634a1.318 1.318 0 001.318 1.32h26.354a1.318 1.318 0 001.316-1.32V3.262a1.32 1.32 0 00-1.317-1.318zm0 13.184H15.14a1.317 1.317 0 00-1.317 1.319v2.635a1.318 1.318 0 001.318 1.32h26.354a1.318 1.318 0 001.316-1.32v-2.637a1.32 1.32 0 00-1.317-1.317z"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  );
}

export default SortPanel;
