import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import EditControl from './edit-control.component';

import useForm from '../../../hooks/useForm';

import useStyles from './edit.styles';

const Edit = ({ type, id, value, label, helperText, disabled, required, validators, errors, onSubmit, secondaryButton }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { state: { [id]: state }, handleChange, handleSubmit } = useForm(
    { [id]: { value, error: '' } },
    { [id]: { required, validators, errors } },
    ({ [id]: submitValue }) => {
      onSubmit(submitValue);
      setEdit(false);
    }
  );
  const handleEdit = () => {
    handleChange({ target: { name: id, value } });
    setEdit(true);
  };

  return (edit ? (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <EditControl
        type={type}
        id={id}
        label={label}
        helperText={helperText}
        state={state}
        disabled={disabled}
        required={required}
        validators={validators}
        errors={errors}
        onChange={handleChange}
      />
      <Box className={classes.buttons}>
        <Tooltip title="Cancel" aria-label="cancel" enterDelay={500}>
          <IconButton onClick={() => setEdit(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Submit" aria-label="submit" enterDelay={500}>
          <IconButton type="submit" color="primary">
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </form>
  ) : (
    <Box className={classes.form}>
      <Box className={classes.displayBox}>
        <InputLabel className={classes.displayLabel}>
          {label || 'n/a'}
        </InputLabel>
        <Typography variant="body1" className={classes.displayValue}>
          {value || 'n/a'}
        </Typography>
      </Box>
      <Box className={classes.buttons}>
        <Tooltip title="Edit" aria-label="edit" enterDelay={500}>
          <IconButton onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {secondaryButton}
      </Box>
    </Box>
  ));
};

Edit.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'file']),
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.any),
  errors: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  secondaryButton: PropTypes.element,
};

Edit.defaultProps = {
  type: 'text',
  value: null,
  helperText: '',
  disabled: false,
  required: false,
  validators: [],
  errors: [],
  secondaryButton: null,
};

export default Edit;
