import React, { Component } from 'react';
import Nav from './Nav';
import './Departments.css';

class Departments extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentWillMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('https://560project.azurewebsites.net/api/getfields/department')
    .then(res => res.json())
    .then(info => {
      var depts = [];
      info.map(dept=> depts.push(dept))
      this.setState({list:depts})
    }).catch(err=>console.log(err))
  }

  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <Nav></Nav>
        <h1>List of Departments</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
                <div>
                  {list.map((dept,index)=>
                    <div key={index} className="depart-container">
                        <div className="depart-title">
                            <p>{dept["Name"]} - </p>
                        </div>
                        <div className="depart-result">
                          <p> {dept["Description"]}</p>
                        </div>
                    </div>
                  )}
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

export default Departments;
