import React from 'react';
import './nav.css';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderAuth from '../HeaderAuth';
const Nav = React.memo(props => {
  // old path
  const location = useLocation();
  const from = location.state && location.state.background;
  return (
    <header className="header">
      <div className="header__left">
        <h1>
          <a href="/" className="header__brand">
            seyirlik
          </a>
        </h1>
        <HeaderAuth />
      </div>
      <div className="header__right">
        <nav className="header__nav">
          <NavLink
            to="/rastgele"
            className="header__link"
            activeClassName="header__link--active"
            location={from}
            isActive={(match, location) => {
              if (location && location.pathname === '/rastgele') {
                return true;
              }

              return false;
            }}
          >
            <svg
              width="19"
              height="19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="header__icon"
            >
              <path
                d="M17.488.332H1.178a.844.844 0 00-.6 1.44l6.5 6.5v7.244a.844.844 0 00.36.691l2.812 1.968a.844.844 0 001.328-.691V8.275l6.5-6.5a.845.845 0 00-.59-1.443z"
                fill="#fff"
              />
            </svg>
            Rastgele
          </NavLink>
          <NavLink
            to="/tavsiye-robotu"
            className="header__link"
            activeClassName="header__link--active"
          >
            <svg
              width="25"
              height="22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="header__icon"
            >
              <path
                d="M24.657 15.969a1.172 1.172 0 010 1.657l-3.906 3.905a1.173 1.173 0 01-2-.829v-1.951H15.88a.585.585 0 01-.428-.186l-3.445-3.691 2.6-2.79 2.577 2.761h1.566v-1.952a1.173 1.173 0 012-.829l3.907 3.905zM.586 7.032h4.1l2.577 2.761 2.6-2.79-3.439-3.691A.586.586 0 006 3.126H.586A.586.586 0 000 3.712v2.739a.586.586 0 00.586.581zm18.164 0v1.952a1.173 1.173 0 002 .83l3.906-3.906a1.172 1.172 0 000-1.657L20.751.345a1.173 1.173 0 00-2 .829v1.952H15.88a.586.586 0 00-.428.186L4.687 14.845H.586a.586.586 0 00-.586.586v2.734a.586.586 0 00.586.586H6a.585.585 0 00.428-.186L17.187 7.032h1.563z"
                fill="#fff"
              />
            </svg>
            Tavsiye Robotu
          </NavLink>
        </nav>
      </div>
    </header>
  );
});

export default Nav;
