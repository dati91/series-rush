import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { setAppWaiting, addAlert } from '../app';
import { getProfile } from '../auth';
import { getFirestoreOrderedByPath } from '../firestore';

// Initial state
export const initialState = {};

// Reducer
export const reducer = handleActions(
  {},
  initialState,
);

// Selectors
export const getGroupsByType = type => createSelector(
  getFirestoreOrderedByPath(`${type}Groups`),
  groups => groups.sort((a, b) => a.order - b.order),
);
export const getCollectionByType = type => createSelector(
  getFirestoreOrderedByPath(`${type}Collection`),
  collection => collection,
);
export const getCollectionByTypeAndGroup = (type, group) => createSelector(
  getCollectionByType(type),
  collection => collection.filter(item => item.group === group),
);

// Async actions
export const addToCollection = (id, type, group) => async (dispatch, getState, { getFirestore }) => {
  dispatch(setAppWaiting(true));
  try {
    const firestore = getFirestore();
    const { id: profileID } = getProfile(getState());

    await firestore.add(
      {
        collection: 'collections',
        doc: profileID,
        subcollections: [{ collection: type }],
      },
      {
        id,
        group,
      },
    );

    dispatch(addAlert('alert:collection/add-to-collection-success', 'success'));
  } catch (error) {
    dispatch(addAlert('alert:collection/add-to-collection-failure', 'error'));
  } finally {
    dispatch(setAppWaiting(false));
  }
};
