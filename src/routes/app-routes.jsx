import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../components/pages/landing/landing.container';
import SignIn from '../components/pages/sign-in/sign-in.container';
import SignUp from '../components/pages/sign-up/sign-up.container';
import ForgotPassword from '../components/pages/forgot-password/forgot-password.container';
import Profile from '../components/pages/profile/profile.container';
import Dashboard from '../components/pages/dashboard/dashboard.container';
import Collection from '../components/pages/collection/collection.container';
import Explore from '../components/pages/explore/explore.container';
import Search from '../components/pages/search/search.container';

import ProtectedRoute from './protected-route';

import { APP_PATHS } from '../constants/paths';

const AppRoutes = () => (
  <Switch>
    <Route exact path={APP_PATHS.LANDING} component={Landing} />
    <Route exact path={APP_PATHS.EXPLORE} component={Explore} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_IN} component={SignIn} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_UP} component={SignUp} />
    <ProtectedRoute exact reverse path={APP_PATHS.FORGOT_PASSWORD} component={ForgotPassword} />
    <ProtectedRoute exact path={APP_PATHS.DASHBOARD} component={Dashboard} />
    <ProtectedRoute path={APP_PATHS.PROFILE} component={Profile} />
    <ProtectedRoute path={APP_PATHS.COLLECTION} component={Collection} />
    <ProtectedRoute path={APP_PATHS.SEARCH} component={Search} />
    <Redirect to={APP_PATHS.LANDING} />
  </Switch>
);

export default AppRoutes;
