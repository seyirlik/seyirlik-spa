import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import reducers from './reducers';
// axios instance
import http from '../utils/http';

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument(http)),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
