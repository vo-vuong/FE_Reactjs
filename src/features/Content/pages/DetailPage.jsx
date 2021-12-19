import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import queryString from 'query-string';
import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import ProductDescription from '../components/ContentDescription';
import ContentFilters from '../components/ContentFilters';
import ContentInfo from '../components/ContentInfo';
import useContentDetail from '../hooks/useContentDetail';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  boxImage: {
    marginBottom: '20px',
  },

  contentImage: {
    backgroundSize: 'content',
    marginTop: '15px',
    marginLeft: '25%',
    marginRight: '25%',
    width: '50%',
    height: '300px',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const history = useHistory();

  const {
    params: { contentId },
    url,
  } = useRouteMatch();

  const { content, loading } = useContentDetail(contentId);
  const [filters, setFilters] = useState(() => ({
    page: 1,
    sort: 'moi-cu',
  }));

  const handleFiltersChange = (newFilters) => {
    history.push({
      pathname: '/contents',
      search: queryString.stringify(filters),
    });
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ContentFilters filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <Box className={classes.boxImage}>
                <img src={content.url} alt={content.name} className={classes.contentImage} />
              </Box>
              <ContentInfo content={content} />
            </Paper>
            <Box>
              <Switch>
                <Route exact path={url}>
                  <ProductDescription content={content} />
                </Route>
              </Switch>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DetailPage;
