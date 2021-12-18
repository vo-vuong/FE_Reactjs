import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import CartAdminPage from './pages/CartAdminPage';

CartAdmin.propTypes = {};

function CartAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={CartAdminPage} />
    </Switch>
  );
}

export default CartAdmin;
