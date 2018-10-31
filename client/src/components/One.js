import React, { Component } from 'react';

class One extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: ''
    }
    this.getOne = this.getOne.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getOne();
  }

  // Retrieves the list of items from the Express app
  getOne(){
    var idNumber = "9";
    fetch('/api/getEmployee/'+ idNumber)
    .then(res => res.json())
    .then(idNum =>  this.setState({idNum}))
  }

  render() {
    const { idNum } = this.state;
    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {idNum.length ? (
          <div>
                <div>
                  Employee ID: {idNum}
                </div>
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default One;
