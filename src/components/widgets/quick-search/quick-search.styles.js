import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  search: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing(3),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
