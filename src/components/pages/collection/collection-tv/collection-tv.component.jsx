import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import ChipArray from '../../../commons/chip-array/chip-array.component';

const CollectionTv = ({ groups }) => (
  <Box>
    <ChipArray
      items={groups}
      breakpoint="xs"
    />
  </Box>
);

CollectionTv.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default CollectionTv;
