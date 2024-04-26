import './App.css'
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom"
import '@mantine/core/styles.css';
import Homepage from './pages/Homepage';
import Feedpage from './pages/Feedpage';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'><Homepage/></Route>
        <Route exact path='/feed'><Feedpage/></Route>
        <Router></Router>
      </Switch>
    </HashRouter>
  )
}

export default App
