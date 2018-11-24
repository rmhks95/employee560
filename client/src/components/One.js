import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Nav from './Nav';
import './One.css';

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
  getOne(event){
    event.preventDefault();
    document.getElementById("one-list").style.display = "block";
    var employeeName = document.getElementById("employeeName").value;
    fetch('https://560project.azurewebsites.net/api/getEmployee/'+ employeeName)
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
          <Nav></Nav>
          <h1>Find Employee</h1>
          {/* Check to see if any items are found*/}
              Enter Employee First and Last Name: <input type="text" id="employeeName"></input>
            <button type="submit" onClick={this.getOne}>Submit</button>

          <div id="one-list">
              {idNum.length ? (
                  <div><br></br>
                        <div>
                        {idNum.map((emp,index)=>{
                          return(
                            <div key={index} style={{marginBottom:"10px"}}>
                              ID: {emp["EmployeeId"]}
                              <br/>
                              Started On: {moment(emp["DateStarted"]).format('L')}
                              <br/>
                              {emp["DateLeft"]? `Date Left: ${moment(emp["DateLeft"]).format('L')}`:""}
                              {emp["DateLeft"]?<br/>:""}
                              Email: {emp["Email"]}
                              <br/>
                              Position: {emp["Title"]} in {emp["DepartmentName"]}
                              <br/>
                              Office: {emp["RoomNumber"]} in {emp["Building"]}
                              <br/>
                              <Link to={`newEmployee/${emp["EmployeeId"]}`}>Edit Employee</Link>
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
      </div>
    );
  }
}

export default One;
