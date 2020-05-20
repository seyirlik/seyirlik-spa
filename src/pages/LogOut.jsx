import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { logout } from '../store/actions/auth';

const LogOut = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const from = location.state ? location.state.background : { pathname: '/' };
  useEffect(() => {
    //Componentdidmount
    localStorage.removeItem('token');
    dispatch(logout());
    history.replace(from.pathname);
  });

  return <h1>Çıkış Yapılıyor...</h1>;
};

export default LogOut;
