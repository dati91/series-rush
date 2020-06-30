import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import Tooltip from '../../../commons/tooltip';
import FormButton from '../../../commons/form-button';

import {
  getSerachResultDetailsDialogOpen,
  closeSearchResultDetailsDialog,
} from '../../../../store/search';

const SearchResultListItemDetailsDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const open = useSelector(getSerachResultDetailsDialogOpen);

  const handleClose = useCallback(() => {
    dispatch(closeSearchResultDetailsDialog());
  }, [dispatch]);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
    >
      <DialogTitle>
        Title
        <Box
          position="absolute"
          top={1}
          right={1}
        >
          <Tooltip title={t('common::close')}>
            <IconButton onClick={handleClose}>
              <HighlightOffTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Text
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FormButton
          variant="text"
          color="primary"
          label={t('common::close')}
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultListItemDetailsDialog;
