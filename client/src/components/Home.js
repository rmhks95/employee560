import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <div id="home-wrap">
          <Link to={'./departments'}>
            <button variant="raised">
                Department List
            </button>
          </Link>
          <Link to={'./one'}>
            <button variant="raised">
                Find Employee(s)
            </button>
          </Link>
          <br/>
          <Link to={'./newEmployee/0'}>
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
    </div>
    );
  }
}
export default Home;
