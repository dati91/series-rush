import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { addAlert } from '../app';
import { NUMBER_OF_SEARCH_RESULTS } from '../../constants/config';

// Initial state
export const initialState = {
  searching: false,
  result: [],
};

// Action types
export const SERIES_SEARCH_REQUEST = 'SERIES_SEARCH_REQUEST';
export const SERIES_SEARCH_SUCCESS = 'SERIES_SEARCH_SUCCESS';
export const SERIES_SEARCH_FAILURE = 'SERIES_SEARCH_FAILURE';

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

// Selectors
export const getSerachResult = state => state.search.result;
export const getSearching = state => state.search.searching;
export const getFourSearchResult = createSelector(
  getSerachResult,
  result => result.slice(0, NUMBER_OF_SEARCH_RESULTS)
);
export const getHasMoreResult = createSelector(
  getSerachResult,
  result => result.length > NUMBER_OF_SEARCH_RESULTS
);

// Reducer
export const reducer = handleActions(
  {
    [seriesSearchRequest]: state => ({ ...state, searching: true }),
    [seriesSearchSuccess]: (state, { payload: result }) => ({ ...state, searching: false, result }),
    [seriesSearchFailure]: state => ({ ...state, searching: false }),
  },
  initialState
);

export const seriesSearch = query => async (dispatch, getState, { tvmazeApi }) => {
  dispatch(seriesSearchRequest());
  try {
    const result = await tvmazeApi.searchShow(query);
    dispatch(seriesSearchSuccess(result));
  } catch (error) {
    dispatch(seriesSearchFailure());
    dispatch(addAlert('alert:api/tvmaze-search-show', 'error'));
  }
};
