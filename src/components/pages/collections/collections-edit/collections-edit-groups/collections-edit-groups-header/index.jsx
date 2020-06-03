import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PageTitle from '../../../../../commons/page-title';
import Tooltip from '../../../../../commons/tooltip';

import {
  getIsGroupAddEnabled,
  openCollectionsDialog,
  setCollectionsDialogData,
} from '../../../../../../store/collections';

const CollectionsEditGroupsHeader = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const dispatch = useDispatch();
  const isGroupAddEnabled = useSelector(getIsGroupAddEnabled(type));

  const handleAddGroupClick = useCallback(() => {
    dispatch(setCollectionsDialogData(null));
    dispatch(openCollectionsDialog('form'));
  }, [dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
    >
      <Box pt={1}>
        <PageTitle title={t('page.collections.edit.groups.typeTitle', { type })} />
      </Box>
      <Box
        display="flex"
        alignContent="center"
        alignItems="center"
      >
        {isGroupAddEnabled && (
          <Tooltip title={t('page.collections.edit.groups.add')}>
            <Box>
              <IconButton onClick={handleAddGroupClick}>
                <AddCircleTwoToneIcon color="secondary" />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default CollectionsEditGroupsHeader;
