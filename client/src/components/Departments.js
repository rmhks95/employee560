import React, { Component } from 'react';

class Departments extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      set:false
    }
  }

  // Fetch the list on first mount
  componentWillMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('https://560project.azurewebsites.net/api/departments')
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
        <h1>List of Departments</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            
                <div>
                  {list.map((dept,index)=><div key={index}>{dept["Name"]} - {dept["Description"]}</div>)}
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