import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import HomeAdminPage from './pages/HomeAdminPage';

HomeAdminFeature.propTypes = {};

// file nay goi la entry point
// Trong day chua sub routing dan toi trang HomePage
function HomeAdminFeature(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.url} exact component={HomeAdminPage} />
      </Switch>
    </Box>
  );
}

export default HomeAdminFeature;
