import React from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import PublicIcon from '@material-ui/icons/PublicOutlined';

import useStyles from './explore.styles';

const Explore = ({ exploreSeries }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const result = exploreSeries();

  return (
    <Container maxWidth="lg">
      {result.length ? (
        <Grid container spacing={2}>
          {result.map(({ show }) => (
            <Grid item key={show.id} xs={12} md={6}>
              <Card>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <img
                      src={show.image ? show.image.medium : 'https://via.placeholder.com/70x98?text=...'}
                      alt={show.name}
                      className={classes.poster}
                      draggable={false}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardHeader title={show.name} />
                    <CardContent>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`${t('page.explore.premiered')}: ${show.premiered || t('common:unknown')}`}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`${t('page.explore.status')}: ${show.status || t('common:unknown')}`}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`${t('page.explore.rating')}: ${(show.rating && show.rating.average) || t('common:unknown')}`}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        href={show.officialSite || ''}
                        component={Link}
                        target="_blank"
                        disabled={!show.officialSite}
                      >
                        <PublicIcon />
                      </IconButton>
                      <IconButton className={classes.arButton}>
                        <AddIcon />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          {t('page.explore.emptyResult')}
        </Typography>
      )}
    </Container>
  );
};

Explore.propTypes = {
  exploreSeries: PropTypes.func.isRequired,
};


export default Explore;
