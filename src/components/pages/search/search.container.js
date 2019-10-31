import { connect } from 'react-redux';

import {
  getSearchResults,
  getSearchNumberOfPages,
  getSearchPage,
  getSearchQuery,
  getSearchInProgress,
  search,
  checkSearch,
  clearSearchProps,
} from '../../../store/search';
import Search from './search.component';

const mapStateToProps = state => ({
  results: getSearchResults(state),
  numberOfPages: getSearchNumberOfPages(state),
  page: getSearchPage(state),
  query: getSearchQuery(state),
  searchInProgress: getSearchInProgress(state),
});

const mapDispatchToProps = {
  clearSearchProps,
  search,
  checkSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
