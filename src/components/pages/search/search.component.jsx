import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'material-ui-flat-pagination';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SearchResults from './search-results/search-results.container';

import useStyles from './search.styles';

const Search = ({ results, query, page, numberOfPages, clearSearchProps, search, checkSearch, location }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedPage, selectPage] = useState(null);

  const handlePageSelect = (e, offset) => {
    search({ page: offset + 1 });
    selectPage(offset);
  };

  useEffect(() => {
    selectPage(page - 1);
  }, [page]);
  useEffect(() => {
    checkSearch();
  }, [location, checkSearch]);
  useEffect(() => () => clearSearchProps(), [clearSearchProps]);

  return (
    <Container maxWidth="lg">
      {results.length > 0 && !!query ? (
        <SearchResults />
      ) : (
        <Typography>
          {t('page.search.emptyResult')}
        </Typography>
      )}
      {results.length && numberOfPages > 1 && (
        <Pagination
          limit={1}
          total={numberOfPages}
          offset={selectedPage}
          onClick={handlePageSelect}
          classes={{
            root: classes.pagination,
          }}
        />
      )}
    </Container>
  );
};

Search.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  numberOfPages: PropTypes.number,
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
  clearSearchProps: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  checkSearch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

Search.defaultProps = {
  results: [],
  numberOfPages: null,
  page: null,
};

export default withRouter(Search);
