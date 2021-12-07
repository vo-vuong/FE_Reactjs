import Admin from 'components/Admin';
import Client from 'components/Client';
import Auth from 'features/Auth';
import { ProtectedRoute } from 'protected.route';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/login" component={Auth} />
        <ProtectedRoute path="/admin" component={Admin} />
        <Route path="/" component={Client} />
      </Switch>
    </div>
  );
}

export default App;
