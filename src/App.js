import ProductFeature from 'features/Product';
import { Route, Switch } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;

// Trong ProductFeature lai co routing de di xuong trang listing.
