import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductAdminPage from './pages/ProductAdminPage';

ProductAdmin.propTypes = {};

function ProductAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ProductAdminPage} />
    </Switch>
  );
}

export default ProductAdmin;
