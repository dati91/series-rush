import invoke from './axios';
import { TV_MAZE_API } from '../constants/config';

const api = {
  get: invoke(TV_MAZE_API, 'GET'),
};

export const searchShow = show => api.get('/search/shows', { query: { q: show } });
export const searchSingleShow = show => api.get('/singlesearch/shows', { query: { q: show } });
export const getShow = show => api.get('/shows/' + show );

export default {
  searchShow,
  searchSingleShow,
  getShow,
};
