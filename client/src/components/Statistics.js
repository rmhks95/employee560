import React, { Component } from 'react';
import Nav from './Nav';
import './Statistics.css';

class Stats extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: {}
    }
    this.getOne = this.getStats.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getStats();
  }

  // Retrieves the list of items from the Express app
  getStats(){
    fetch('https://560project.azurewebsites.net/api/getStats/')
    .then(res => res.json())
    .then(stat => {
        this.setState({idNum:stat})
    }).catch(err=> console.log(err))
  }

  render() {
    const { idNum } = this.state;
    return (
      <div className="App">
      <Nav></Nav>
        <h1>Company Stats</h1>
          <div><br></br>
                <div className="stats-container">
                    <div className="stats-title">Current Employee: </div><div className="stats-result">{idNum["currently"]}</div>
                </div>
                <div className="stats-container">
                    <div className="stats-title">Hired Employee over the last year: </div><div className="stats-result">{idNum["pastYear"]}</div>
                </div>
                <div className="stats-container">
                    <div className="stats-title">Number of Countries that we have offices in: </div><div className="stats-result">{idNum["countries"]}</div>
                </div>
          </div>
      </div>
    );
  }
}

export default Stats;
