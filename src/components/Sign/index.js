import React, { useState, useEffect } from 'react';
import './sign.css';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/actions/auth';

function Sign(props) {
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();
  const location = useLocation();
  const hash = location.hash && location.hash.includes('#kayit-ol');
  const [activeTab, setActiveTab] = useState(hash);
  useEffect(() => {
    setActiveTab(hash);
  }, [hash]);

  useEffect(() => {
    dispatch(clearError());
  }, [activeTab, dispatch]);

  // function changeActiveTab(v, e) {
  // e.preventDefault();
  // setActiveTab(v);
  // }

  return (
    <aside className={`Sign ${props.class}`}>
      <ul className="Sign__links">
        <li className={`Sign__link ${!activeTab && 'Sign__link--active'}`}>
          <a href="#giris">Giriş Yap</a>
        </li>
        <li className={`Sign__link ${activeTab && 'Sign__link--active'}`}>
          <a href="#kayit-ol">Kayıt Ol</a>
        </li>
      </ul>
      <ul className="Sign__tabs">
        <div className={`Sign__tab ${!activeTab && 'Sign__tab--active'}`}>
          <Login />
        </div>
        <div className={`Sign__tab ${activeTab && 'Sign__tab--active'}`}>
          <Register />
        </div>
        {error && (
          <ul className="Sign__Errors">
            <li className="Sign__Error">*{error}*</li>
          </ul>
        )}
      </ul>
    </aside>
  );
}

export default Sign;
