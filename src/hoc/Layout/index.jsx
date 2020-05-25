import React from 'react';
import Nav from '../../components/Nav';

const withLayout = (WrappedComponent) => {
  return function WithLayout(props) {
    return (
      <div className="container">
        <Nav />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withLayout;
