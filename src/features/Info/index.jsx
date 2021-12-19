import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import InfoPage from './pages/InfoPage';

InfoFeature.propTypes = {};

function InfoFeature(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={InfoPage} />
      </Switch>
    </Box>
  );
}

export default InfoFeature;
