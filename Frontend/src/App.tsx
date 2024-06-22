import './App.css';
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';
import Account from './pages/Account';
import PrivateRoute from './PrivateRoute';  // Import the PrivateRoute component

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'><Homepage /></Route>
        <PrivateRoute exact path='/feed' component={Feedpage} />  // Use PrivateRoute for Feedpage
        <PrivateRoute exact path='/account/:userName' component={Account} />  // Use PrivateRoute for Account
        <Router></Router>
      </Switch>
    </HashRouter>
  )
}

export default App;
