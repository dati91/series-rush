import { createAction, handleActions } from 'redux-actions';
import { addAlert } from '../app';

// Initial state
export const initialState = {
  searchInProgress: false,
  result: [],
  query: '',
};

// Action types
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const STORE_SEARCH_QUERY = 'STORE_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';

// Action creators
export const searchRequest = createAction(
  SEARCH_REQUEST
);
export const searchSuccess = createAction(
  SEARCH_SUCCESS,
  result => result
);
export const searchFailure = createAction(
  SEARCH_FAILURE
);
export const storeSearchQuery = createAction(
  STORE_SEARCH_QUERY,
  query => query
);
export const clearSearchQuery = createAction(
  CLEAR_SEARCH_QUERY
);
export const clearSearchResult = createAction(
  CLEAR_SEARCH_RESULT
);

// Selectors
export const getSearchResult = state => state.search.result;
export const getSearchInProgress = state => state.search.searchInProgress;
export const getSearchQuery = state => state.search.query;

// Reducer
export const reducer = handleActions(
  {
    [searchRequest]: state => ({ ...state, searchInProgress: true }),
    [searchSuccess]: (state, { payload: result }) => ({ ...state, searchInProgress: false, result }),
    [searchFailure]: state => ({ ...state, searchInProgress: false }),
    [storeSearchQuery]: (state, { payload: query }) => ({ ...state, query }),
    [clearSearchQuery]: state => ({ ...state, query: '' }),
    [clearSearchResult]: state => ({ ...state, result: [] }),
  },
  initialState
);

export const search = (query, type) => async (dispatch, getState, { tmdbApi, history }) => {
  dispatch(searchRequest());
  dispatch(storeSearchQuery(query));
  try {
    // Check the location and navigate to the search page if neccessary
    const { location: { pathname } } = history;
    if (!pathname.startsWith('/search')) history.push('/search');

    // Fetch the results from tmdb
    await tmdbApi.searchWithType(query, type);
  } catch (error) {
    dispatch(searchFailure());
    dispatch(addAlert('alert:api/tvmaze-search-show', 'error'));
  }
};
