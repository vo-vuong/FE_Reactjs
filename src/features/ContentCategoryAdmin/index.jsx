import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ContentCategoryPage from './pages/ContentCategoryPage';

ListCategoryContentAdmin.propTypes = {};

function ListCategoryContentAdmin(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact component={ContentCategoryPage} />
    </Switch>
  );
}

export default ListCategoryContentAdmin;
