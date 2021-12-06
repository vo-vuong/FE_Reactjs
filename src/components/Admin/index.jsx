import { Box, makeStyles } from '@material-ui/core';
import HeaderAdmin from 'components/HeaderAdmin';
import MenuAdmin from 'components/MenuAdmin';
import HomeAdminFeature from 'features/HomeAdmin';
import ListCagegoryAdmin from 'features/ProductCategoryAdmin';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <HeaderAdmin />

        <Box className={classes.page}>
          <MenuAdmin />

          <Switch>
            <Route exact path={match.url} component={HomeAdminFeature} />
            <Route path="/admin/product-category" component={ListCagegoryAdmin} />
            <Route path="/admin/product" component={ListCagegoryAdmin} />
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default Admin;
