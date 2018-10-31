import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
      <Link to={'./one'}>
        <button variant="raised">
            One employee
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
