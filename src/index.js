import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/main.css';
import jwt_decode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
// Store
import store from './store';

// Login Action
import { login } from './store/actions/auth';

if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  if (Date.now() < decoded.exp * 1000) {
    store.dispatch(login(decoded));
  } else {
    localStorage.removeItem('token');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
