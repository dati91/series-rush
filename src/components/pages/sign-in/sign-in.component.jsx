import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LockIcon from '@material-ui/icons/LockOutlined';

import Header from '../../commons/header/header.component';
import SignInForm from './sign-in-form/sign-in-form.container';

import useStyles from './sign-in.styles';

const SignIn = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Header icon={LockIcon} title="Sign In" gutter />

      <SignInForm />

      <Grid container>
        <Grid item xs>
          <Button
            color="primary"
            size="small"
            className={classes.textButton}
            component={Link}
            to="/forgot-password"
          >
            Forgot password?
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            size="small"
            className={classes.textButton}
            component={Link}
            to="/sign-up"
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
