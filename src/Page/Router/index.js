import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Login from '../Login';
import Main from '../Main';
import NoMatch from '../NoMatch';


class PmpRouter extends Component {
  state = {

  }

  render() {
    return (
      <Router >
      <div>
      <Switch> 
      <Route exact path="/" component={Login} />
      <Route path="/Main" component={Main} />
       <Route component={NoMatch}/>
       <Redirect to="/" ></Redirect>
     </Switch>
     </div>
     </Router>
    );
  }
}

export default PmpRouter;
