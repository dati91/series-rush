import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import LockIcon from '@material-ui/icons/LockOutlined';

import useForm from '../../../hooks/useForm';

import useStyles from './forgot-password.styles';
import { STATE_SCHEMA, VALIDATION_SCHEMA } from './forgot-password.constants';

const ForgotPassword = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(STATE_SCHEMA, VALIDATION_SCHEMA);
  const { email } = state;

  return (
    <Container maxWidth="xs">
      <Box className={classes.headerBox}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography align="center" variant="h5">
          Forgot Password
        </Typography>
      </Box>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email.value}
          helperText={email.error}
          error={!!email.error}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send password reset email
        </Button>
      </form>

      <Box className={classes.buttonContainer}>
        <Button
          variant="text"
          color="primary"
          size="small"
          className={classes.signInButton}
          component={Link}
          to="/sign-in"
        >
          Already have an account? Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
