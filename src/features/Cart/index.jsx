import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import CartPage from './pages/CartPage';
// import { useSelector } from 'react-redux';
// import { cartTotalSelector } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
  // const cartTotal = useSelector(cartTotalSelector);

  // return <div>Cart Feature {cartTotal}</div>;
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={CartPage} />
      </Switch>
    </Box>
  );
}

export default CartFeature;
