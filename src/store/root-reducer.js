import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

import { reducer as app } from './app';
import { reducer as auth } from './auth';
import { reducer as collection } from './collection';
import { reducer as explore } from './explore';
import { reducer as search } from './search';

export default combineReducers({
  app,
  auth,
  collection,
  explore,
  search,
  firestore,
  firebase,
});
