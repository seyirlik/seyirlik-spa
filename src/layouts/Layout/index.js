import React from "react";
import Nav from "../../components/Nav";

const Layout = WrappedComponent => {
  return function(props) {
    return (
      <React.Fragment>
        <Nav />
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default Layout;
