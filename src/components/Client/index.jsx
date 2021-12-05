import Footer from 'components/Footer';
import Header from 'components/Header';
import HeaderMenu from 'components/HeaderMenu';
import CartFeature from 'features/Cart';
import HomeFeature from 'features/Home';
import ProductFeature from 'features/Product';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

Client.propTypes = {};

function Client(props) {
  const match = useRouteMatch();

  return (
    <BrowserRouter>
      <Header />
      <HeaderMenu />

      <Switch>
        <Route exact path={match.url} component={HomeFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}
// path="/products", path="/cart" Khong duoc xu dung exact vi neu khong chinh xac o ngoai nay thi khong vao duoc component con trong component products
// nhu /products/productId tuong tu may cai khac
export default Client;
