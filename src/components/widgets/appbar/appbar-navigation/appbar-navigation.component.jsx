import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useStyles from './appbar-navigation.styles';

import { MAIN_MENU } from '../../../../constants/navigation';

const defaultSelected = pathname => {
  const paths = MAIN_MENU.map(({ path }) => path);
  const selected = paths.find(path => pathname.includes(path));

  return selected || false;
};

const AppBarNavigation = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [selected, updateSelected] = useState(defaultSelected(pathname));

  useEffect(() => {
    if (!pathname.includes(selected)) updateSelected(false);
  }, [selected, pathname]);

  return (
    <Tabs
      value={selected}
      onChange={(e, value) => updateSelected(value)}
      className={classes.root}
      TabIndicatorProps={{ className: classes.indicator }}
      classes={{ flexContainer: classes.flexContainer }}
    >
      {MAIN_MENU.map(item => (
        <Tab
          key={item.key}
          value={item.path}
          label={t(item.title)}
          className={classes.tab}
          classes={{
            selected: classes.selected,
          }}
          component={Link}
          to={item.path}
          disableRipple
        />
      ))}
    </Tabs>
  );
};

export default AppBarNavigation;
