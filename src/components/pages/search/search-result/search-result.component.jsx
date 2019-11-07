import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import RightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

import { getEllipsisText } from '../../../../utils';
import { ELLIPSIS_LENGTHS, SEARCH_TYPES } from '../../../../constants/config';

import useStyles from './search-result.styles';

const SearchResult = ({ result, addToSeriesCollection }) => {
  const classes = useStyles();

  const handleAdd = () => {
    const { id, type } = result;

    if (type === SEARCH_TYPES.TV) addToSeriesCollection(id);
  };

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        <img
          src={result.posterPath}
          alt={result.name}
          draggable={false}
          className={classes.poster}
        />
      </Hidden>
      <Box className={classes.container}>
        <CardHeader
          title={result.name}
          titleTypographyProps={{
            variant: 'h6',
          }}
          subheader={result.premiere}
        />
        <Hidden smUp>
          <img
            src={result.backdropPath}
            alt={result.name}
            draggable={false}
            className={classes.backdrop}
          />
        </Hidden>
        <CardContent className={classes.content}>
          <Typography variant="body2" component="p">
            <Hidden mdDown>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.MD)}
            </Hidden>
            <Hidden smDown lgUp>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.XS)}
            </Hidden>
            <Hidden xsDown mdUp>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.MD)}
            </Hidden>
            <Hidden smUp>
              {result.overview}
            </Hidden>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
          <Box className={classes.grow} />
          <IconButton>
            <RightIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

SearchResult.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    premiere: PropTypes.string,
    posterPath: PropTypes.string,
    backdropPath: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
  }).isRequired,
  addToSeriesCollection: PropTypes.func.isRequired,
};

export default SearchResult;
