import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import OriginPage from './pages/OriginPage';

OriginAdmin.propTypes = {};

function OriginAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={OriginPage} />
    </Switch>
  );
}

export default OriginAdmin;
