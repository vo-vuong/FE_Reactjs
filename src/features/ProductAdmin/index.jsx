import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductAdminPage from './pages/ProductAdminPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailAdminPage from './pages/ProductDetailAdminPage';

ProductAdmin.propTypes = {};

function ProductAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ProductAdminPage} />
      <Route path={`${match.url}/create`} exact component={ProductCreatePage} />
      <Route path={`${match.url}/:productId`} exact component={ProductDetailAdminPage} />
    </Switch>
  );
}

export default ProductAdmin;
