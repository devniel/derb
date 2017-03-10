import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, Link, browserHistory, IndexRedirect, IndexRoute} from 'react-router'
import AppActions from './actions/AppActions';

// Option : Check if it's logged in AppActions.start
AppActions.start();

import Index from './pages/Index';

export default class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Index}></Route>
        </Router>
    );
  }
}