import React, { Component } from 'react';

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
        <h1>Company Stats</h1>
          <div><br></br>
                <div>
                    Current Employee: {idNum["currently"]}
                </div>
                <div>
                    Hired Employee over the last year: {idNum["pastYear"]}
                </div>
                <div>
                    Number of Countries that we have offices in: {idNum["countries"]}
                </div>
          </div>
      </div>
    );
  }
}

export default Stats;
