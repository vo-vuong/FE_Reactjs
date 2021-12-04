import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import HomePage from './pages/HomePage';

HomeFeature.propTypes = {};

// file nay goi la entry point
// Trong day chua sub routing dan toi trang HomePage
function HomeFeature(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.url} exact component={HomePage} />
      </Switch>
    </Box>
  );
}

export default HomeFeature;
