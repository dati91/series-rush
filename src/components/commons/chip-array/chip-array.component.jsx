import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { getFirstLetter } from '../../../utils';

import useStyles from './chip-array.styles';

const ChipArray = ({ items, size, variant, selected, onClick, breakpoint }) => {
  const classes = useStyles({ size, breakpoint });

  useEffect(() => {
    if (!selected && items.length > 0) onClick(items[0].id);
  }, [selected, items, onClick]);

  return (
    <Box className={classes.box}>
      {items.map((item, index) => (
        <Chip
          key={item.id}
          avatar={(
            <Avatar>
              {getFirstLetter(item.label, index + 1)}
            </Avatar>
          )}
          label={item.label}
          onClick={onClick ? () => onClick(item.id) : undefined}
          size={size}
          variant={variant}
          color={selected === item.id ? 'secondary' : 'default'}
          className={classes.chip}
          classes={{
            label: classes.label,
          }}
        />
      ))}
    </Box>
  );
};

ChipArray.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  variant: PropTypes.oneOf(['default', 'outlined']),
  selected: PropTypes.string,
  onClick: PropTypes.func,
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', '']),
};

ChipArray.defaultProps = {
  size: 'medium',
  variant: 'default',
  selected: '',
  onClick: undefined,
  breakpoint: '',
};

export default ChipArray;
