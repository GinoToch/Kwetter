import './App.css'
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';
import Account from './pages/Account';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'><Homepage/></Route>
        <Route exact path='/feed'><Feedpage/></Route>
        <Route exact path='/account/:userName'><Account/></Route>
        <Router></Router>
      </Switch>
    </HashRouter>
  )
}

export default App
