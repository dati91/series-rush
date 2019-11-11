import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import useStyles from './project-title.styles';

const ProjectTitle = ({ withLogo }) => {
  const classes = useStyles();

  return (
    <>
      {withLogo && (
        <img
          src="/logo192.png"
          alt="Series Rush"
          className={classes.logo}
          draggable={false}
        />
      )}
      <Typography variant="h6" component="h6">
        Series Rush
      </Typography>
    </>
  );
};

ProjectTitle.propTypes = {
  withLogo: PropTypes.bool,
};

ProjectTitle.defaultProps = {
  withLogo: false,
};

export default ProjectTitle;
