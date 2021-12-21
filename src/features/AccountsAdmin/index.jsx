import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AccountsAdminPage from './pages/AccountsAdminPage';
import AccountsCreatePage from './pages/AccountsCreatePage';
import AccountsDetailAdminPage from './pages/AccountsDetailAdminPage';

AccountsAdmin.propTypes = {};

function AccountsAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={AccountsAdminPage} />
      {/* <Route path={`${match.url}/create`} exact component={AccountsCreatePage} /> */}
      <Route path={`${match.url}/:accountId`} exact component={AccountsDetailAdminPage} />
    </Switch>
  );
}

export default AccountsAdmin;
