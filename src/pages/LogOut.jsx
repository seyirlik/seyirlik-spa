import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
const LogOut = props => {
  const location = useLocation();
  const history = useHistory();
  const from = location.state ? location.state.background : { pathname: "/" };
  useEffect(() => {
    //Componentdidmount
    localStorage.removeItem("token");
    history.replace(from.pathname);
  });

  return <h1>Çıkış Yapılıyor...</h1>;
};

export default LogOut;
