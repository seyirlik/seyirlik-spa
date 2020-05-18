import { combineReducers } from 'redux';

import auth from '../reducers/auth';
import modal from '../reducers/modal';
import details from '../reducers/details';
import films from '../reducers/films';

export default combineReducers({
  auth,
  modal,
  details,
  films,
});
