import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const SplitButton = ({ options, variant, color, size, disabled, onClick }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleClick = () => {
    setOpen(false);
    onClick(selected.key);
  };

  const handleMenuItemClick = option => {
    setSelected(option);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <ButtonGroup
        variant={variant}
        color={color}
        size={size}
        ref={anchorRef}
        disabled={disabled}
      >
        <Button onClick={handleClick}>
          {selected.label}
        </Button>
        <Button
          color={color}
          size={size}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {options.map(option => (
                <MenuItem
                  key={option.key}
                  selected={option.key === selected.key}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

SplitButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
};

SplitButton.defaultProps = {
  variant: 'outlined',
  color: 'default',
  size: 'medium',
  disabled: false,
};

export default SplitButton;
