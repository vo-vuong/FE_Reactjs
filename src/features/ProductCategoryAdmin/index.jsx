import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductCategoryPage from './pages/ProductCategoryPage';

ListCagegoryAdmin.propTypes = {};

function ListCagegoryAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ProductCategoryPage} />
    </Switch>
  );
}

export default ListCagegoryAdmin;
