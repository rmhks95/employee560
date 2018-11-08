import React, { Component } from 'react';
import moment from 'moment';

class One extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: []
    }
    this.getOne = this.getOne.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    //this.getOne();
  }

  // Retrieves the list of items from the Express app
  getOne(){
    var idNumber = document.getElementById("employeeID").value;
    fetch('https://560project.azurewebsites.net/api/getEmployee/'+ idNumber)
    .then(res => res.json())
    .then(employee => { 
      var list = [];
      employee.map(info=> list.push(info))
      this.setState({idNum:list})
    }).catch(err=> console.log(err))
  }

  render() {
    const { idNum } = this.state;
    return (
      <div className="App">
      <h1>Find Employee</h1>
      {/* Check to see if any items are found*/}
        Enter Employee Number: <input type="text" id="employeeID"></input>
        <button type="submit" onClick={this.getOne}>Submit</button>
      {idNum.length ? (
          <div><br></br>
                <div>
                Employee: {idNum.map((dept,index)=>{ 
                  return(
                    <div>
                      Name: {dept["FirstName"]} {dept["LastName"]}
                      <br/>
                      Started On: {moment(dept["DateStarted"]).format('L')}
                      <br/>
                      {dept["DateLeft"]? `Date Left: ${moment(dept["DateLeft"]).format('L')}`:""}
                      {dept["DateLeft"]?<br/>:""}
                      Email: {dept["Email"]}

                    </div>
                  )})}
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
