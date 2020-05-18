import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WithLogin = ({ children, ...rest }) => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      history.goBack();
    }
  }, [history, isAuthenticated]);
  return <Route {...rest}>{children}</Route>;
};

export default WithLogin;
