import { createAction, handleActions } from 'redux-actions';
import { addAlert } from '../app';

// Initial state
export const initialState = {
  loading: false,
  loaded: false,
  result: [],
};

// Action types
export const EXPLORE_REQUEST = 'EXPLORE_REQUEST';
export const EXPLORE_SUCCESS = 'EXPLORE_SUCCESS';
export const EXPLORE_FAILURE = 'EXPLORE_FAILURE';

// Action creators
export const exploreRequest = createAction(
  EXPLORE_REQUEST
);
export const exploreSuccess = createAction(
  EXPLORE_SUCCESS,
  result => result
);
export const exploreFailure = createAction(
  EXPLORE_FAILURE
);

// Selectors
export const getExploreResult = state => state.explore.result;
export const getExploreLoading = state => state.explore.loading;

// Reducer
export const reducer = handleActions(
  {
    [exploreRequest]: state => ({ ...state, loading: true, loaded: false }),
    [exploreSuccess]: (state, { payload: result }) => ({ ...state, loading: false, loaded: true, result }),
    [exploreFailure]: state => ({ ...state, loading: false, loaded: false }),
  },
  initialState
);

export const exploreSeries = () => async (dispatch, getState, { tvmazeApi, history }) => {
  dispatch(exploreRequest());
  try {
    const { location: { pathname } } = history;
    if (!pathname.startsWith('/explore')) history.push('/explore');
    const random_id = Math.floor((Math.random() * 44336) + 1);
    const result = await tvmazeApi.getShow(random_id);
    dispatch(exploreSuccess(result));
  } catch (error) {
    dispatch(exploreFailure());
    dispatch(addAlert('alert:api/tvmaze-search-show', 'error'));
  }
};
