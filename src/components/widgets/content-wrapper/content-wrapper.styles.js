import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  base: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  content: {
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: theme.spacing(9) + 1,
    },
  },
  contentShift: {
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 240,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));
