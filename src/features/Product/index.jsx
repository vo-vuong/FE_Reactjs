import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';

// file nay goi la entry point
// Trong day chua sub routing dan toi trang ListPage
ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      Product Feature
      <Switch>
        <Route path={match.url} exact component={ListPage} />
      </Switch>
    </div>
  );
}

export default ProductFeature;
