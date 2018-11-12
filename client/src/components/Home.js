import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./departments'}>
        <button variant="raised">
            Department List
        </button>
      </Link>
      <Link to={'./one'}>
        <button variant="raised">
            One employee
        </button>
      </Link>
      <Link to={'./newEmployee'}>
        <button variant="raised">
           New Employee
        </button>
      </Link>
      <Link to={'./stat'}>
        <button variant="raised">
           Statistics
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
