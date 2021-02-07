import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

// Main Component  & handles routes
class App extends Component {
  render() {

    return (
      <Router >
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/home"/>
                )}/>
                 <Route exact path='/home' component={Home} />
          </Switch>
    </Router>
    );
  }
}

export default App;
