import { Box, makeStyles } from '@material-ui/core';
import HeaderAdmin from 'components/HeaderAdmin';
import MenuAdmin from 'components/MenuAdmin';
import HomeAdminFeature from 'features/HomeAdmin';
import ProductAdmin from 'features/ProductAdmin';
import ListCagegoryAdmin from 'features/ProductCategoryAdmin';
import { ProtectedRoute } from 'protected.route';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

Admin.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  page: {
    display: 'flex',
  },
}));

function Admin(props) {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <HeaderAdmin />

      <Box className={classes.page}>
        <MenuAdmin />

        <Switch>
          <ProtectedRoute exact path={match.url} component={HomeAdminFeature} />
          <ProtectedRoute path="/admin/product-category" component={ListCagegoryAdmin} />
          <ProtectedRoute path="/admin/product" component={ProductAdmin} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Box>
    </Box>
  );
}

export default Admin;
