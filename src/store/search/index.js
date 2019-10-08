import { createAction, handleActions } from 'redux-actions';
import { addAlert } from '../app';

// Initial state
export const initialState = {
  searching: false,
  result: [],
  query: '',
};

// Action types
export const SERIES_SEARCH_REQUEST = 'SERIES_SEARCH_REQUEST';
export const SERIES_SEARCH_SUCCESS = 'SERIES_SEARCH_SUCCESS';
export const SERIES_SEARCH_FAILURE = 'SERIES_SEARCH_FAILURE';
export const STORE_SEARCH_QUERY = 'STORE_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';

// Action creators
export const seriesSearchRequest = createAction(
  SERIES_SEARCH_REQUEST
);
export const seriesSearchSuccess = createAction(
  SERIES_SEARCH_SUCCESS,
  result => result
);
export const seriesSearchFailure = createAction(
  SERIES_SEARCH_FAILURE
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
export const getSerachResult = state => state.search.result;
export const getSearching = state => state.search.searching;

// Reducer
export const reducer = handleActions(
  {
    [seriesSearchRequest]: state => ({ ...state, searching: true }),
    [seriesSearchSuccess]: (state, { payload: result }) => ({ ...state, searching: false, result }),
    [seriesSearchFailure]: state => ({ ...state, searching: false }),
    [storeSearchQuery]: (state, { payload: query }) => ({ ...state, query }),
    [clearSearchQuery]: state => ({ ...state, query: '' }),
    [clearSearchResult]: state => ({ ...state, result: [] }),
  },
  initialState
);

export const seriesSearch = query => async (dispatch, getState, { tvmazeApi, history }) => {
  dispatch(seriesSearchRequest());
  try {
    const { location: { pathname } } = history;
    if (!pathname.startsWith('/search')) history.push('/search');
    const result = await tvmazeApi.searchShow(query);
    dispatch(seriesSearchSuccess(result));
  } catch (error) {
    dispatch(seriesSearchFailure());
    dispatch(addAlert('alert:api/tvmaze-search-show', 'error'));
  }
};
