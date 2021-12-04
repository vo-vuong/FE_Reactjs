import HeaderMenu from 'components/HeaderMenu';
import CartFeature from 'features/Cart';
import HomeFeature from 'features/Home';
import ProductFeature from 'features/Product';
import { Route, Switch } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <HeaderMenu />

      <Switch>
        <Route path="/" component={HomeFeature} exact />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
      </Switch>
    </div>
  );
}

export default App;

// Trong ProductFeature lai co routing de di xuong trang listing.
