import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Departments from './components/Departments';
import One from './components/One'
import newEmployee from './components/newEmployee';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/newEmployee' component={newEmployee}/>
          <Route path='/departments' component={Departments}/>
          <Route path='/one' component={One}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
