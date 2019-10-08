import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import MuiDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerContent from './drawer-content/drawer-content.component';

import ProfileContext from '../../../contexts/profile';

import useStyles from './drawer.styles';

const Drawer = ({ isDrawerOpened, isMobileDrawerOpened, toggleMobileDrawer }) => {
  const classes = useStyles();
  const { signedIn } = useContext(ProfileContext);

  return signedIn ? (
    <>
      <Hidden smDown>
        <MuiDrawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpened,
            [classes.drawerClose]: !isDrawerOpened,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isDrawerOpened,
              [classes.drawerClose]: !isDrawerOpened,
            }),
          }}
          open={isDrawerOpened}
        >
          <DrawerContent />
        </MuiDrawer>
      </Hidden>
      <Hidden mdUp>
        <MuiDrawer
          variant="temporary"
          className={clsx(classes.drawer, classes.drawerOpen)}
          classes={{
            paper: classes.drawerOpen,
          }}
          open={isMobileDrawerOpened}
          onClose={() => toggleMobileDrawer()}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerContent />
        </MuiDrawer>
      </Hidden>
    </>
  ) : null;
};

Drawer.propTypes = {
  isDrawerOpened: PropTypes.bool.isRequired,
  isMobileDrawerOpened: PropTypes.bool.isRequired,
  toggleMobileDrawer: PropTypes.func.isRequired,
};

export default Drawer;
