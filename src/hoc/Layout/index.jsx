import React from 'react';
import Nav from '../../components/Nav';

const Layout = (WrappedComponent) => {
  return function (props) {
    return (
      <div className="container">
        <Nav />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default Layout;
