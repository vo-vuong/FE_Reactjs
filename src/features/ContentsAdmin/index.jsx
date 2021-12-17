import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ContentsAdminPage from './pages/ContentsAdminPage';
import ContentsCreatePage from './pages/ContentsCreatePage';
import ContentsDetailAdminPage from './pages/ContentsDetailAdminPage';

ContentsAdmin.propTypes = {};

function ContentsAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ContentsAdminPage} />
      <Route path={`${match.url}/create`} exact component={ContentsCreatePage} />
      <Route path={`${match.url}/:contentId`} exact component={ContentsDetailAdminPage} />
    </Switch>
  );
}

export default ContentsAdmin;
