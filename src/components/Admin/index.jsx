import HomeAdminFeature from 'features/HomeAdmin';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

Admin.propTypes = {};

function Admin(props) {
  const match = useRouteMatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={match.url} component={HomeAdminFeature} />
      </Switch>
    </BrowserRouter>
  );
}

export default Admin;
