import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import UpIcon from '@material-ui/icons/ArrowUpwardOutlined';

import SignUpForm from './sign-up-form/sign-up-form.container';

import useStyles from './sign-up.styles';

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.avatarBox}>
        <Avatar className={classes.avatar}>
          <UpIcon />
        </Avatar>
      </Box>

      <SignUpForm />
    </Container>
  );
};

export default SignUp;
