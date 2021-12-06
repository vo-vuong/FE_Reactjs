import HomeAdminFeature from 'features/HomeAdmin';
import ListCagegoryAdmin from 'features/ListCategoryAdmin';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import HeaderAdmin from 'components/HeaderAdmin';
import MenuAdmin from 'components/MenuAdmin';

Admin.propTypes = {};

function Admin(props) {
  const match = useRouteMatch();
  return (
    <BrowserRouter>
      <HeaderAdmin />
      <MenuAdmin />

      <Switch>
        <Route exact path={match.url} component={HomeAdminFeature} />
        <Route path="/admin/product-category" component={ListCagegoryAdmin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Admin;
