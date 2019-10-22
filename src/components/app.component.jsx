import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import AppBar from './widgets/appbar/appbar.container';
import Drawer from './widgets/drawer/drawer.container';
import Alert from './widgets/alert/alert.container';
import Waiting from './widgets/waiting/waiting.component';
import ContentWrapper from './widgets/content-wrapper/content-wrapper.component';
import Footer from './widgets/footer/footer.component';

import { ProfileProvider } from '../contexts/profile';

import AppRoutes from '../routes/app-routes';

const App = ({ authIsLoaded, isAppWaiting, requestTmdbConfiguration }) => {
  useEffect(() => {
    requestTmdbConfiguration();
  }, [requestTmdbConfiguration]);

  return (authIsLoaded ? (
    <main>
      <ProfileProvider>
        <AppBar />
        <Drawer />
        <ContentWrapper>
          <AppRoutes />
        </ContentWrapper>
        <Footer />
        <Alert />
      </ProfileProvider>
      {isAppWaiting && <Waiting type="app" />}
    </main>
  ) : (
    <Waiting type="screen" />
  ));
};

App.propTypes = {
  authIsLoaded: PropTypes.bool.isRequired,
  isAppWaiting: PropTypes.bool.isRequired,
  requestTmdbConfiguration: PropTypes.func.isRequired,
};

export default App;
