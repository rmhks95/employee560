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
                <div>
                   <h2>Department List</h2>
                   <div className="home-icon" id="home-department"></div>
                </div>
            </button>
          </Link>
          <Link to={'./one'}>
            <button variant="raised">
                <div>
                   <h2>Find Employee</h2>
                   <div className="home-icon" id="home-find"></div>
                </div>
            </button>
          </Link>
          <br/>
          <Link to={'./newEmployee/0'}>
            <button variant="raised">
                <div>
                   <h2>New Employee</h2>
                   <div className="home-icon" id="home-new"></div>
                </div>
            </button>
          </Link>
          <Link to={'./stat'}>
            <button variant="raised">
                <div>
                   <h2>Statistics</h2>
                   <div className="home-icon" id="home-stats"></div>
                </div>
            </button>
          </Link>
      </div>
    </div>
    );
  }
}
export default Home;
