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
    var section = document.getElementById("catSelect").value;

    //USE THIS ENDPOINT IF IT IS THE EMPLOYEE'S DATA
    fetch('https://560project.azurewebsites.net/api/getEmployee/'+section+'/'+ employeeName)
    .then(res => res.json())
    .then(employee => {
      var list = [];
      employee.map(info=> list.push(info))
      this.setState({idNum:list})
    }).catch(err=> console.log(err))

    // //USE THIS ENDPOINT FOR THE SUPERVISOR
    // fetch('https://560project.azurewebsites.net/api/getEmployee/supervisor/'+ employeeName)
    // .then(res => res.json())
    // .then(employee => {
    //   var list = [];
    //   employee.map(info=> list.push(info))
    //   this.setState({idNum:list})
    // }).catch(err=> console.log(err))


    // //USE THIS ENDPOINT FOR THE DEPARTMENT
    // fetch('https://560project.azurewebsites.net/api/getEmployee/department/'+ employeeName)
    // .then(res => res.json())
    // .then(employee => {
    //   var list = [];
    //   employee.map(info=> list.push(info))
    //   this.setState({idNum:list})
    // }).catch(err=> console.log(err))


  }


  render() {
    const { idNum } = this.state;
    return (
      <div className="App">
          <Nav></Nav>
          <h1>Find Employee</h1>

          {/* Check to see if any items are found*/}
          <div className="input-container">
            <div className="input-title">
              <select id="catSelect"><option value="employee">Employee</option><option value="supervisor">Supervisor</option><option value="department">Department</option></select>
              <div>Enter Name or ID:</div>
            </div>
              <input type="text" id="employeeName" className="input-result"></input>
          </div>
          <button className="general-button" type="submit" onClick={this.getOne}>SEARCH</button>

          <div id="one-list">
              {idNum.length ? (
                  <div><br></br>
                        <div>
                        {idNum.map((emp,index)=>{
                          return(
                            <div key={index} style={{marginBottom:"20px"}} className="one-employee">
                              <div id="one-titles">
                                  <span className="title">ID: </span>
                                  <br/>
                                  <span className="title">Name: </span>
                                  <br/>
                                  <span className="title">Email: </span>
                                  <br/>
                                  <span className="title">Started On: </span>
                                  <br/>
                                  <span className="title">{emp["DateLeft"]? `Date Left: `:""}</span>
                                  {emp["DateLeft"]?<br/>:<span>
                                    <span className="title">Position: </span>
                                    <br/>
                                    <span className="title">Office: </span>
                                    <br/>
                                  </span>}
                                  
                                  
                              </div>
                              <div id="one-results">
                                  <span className="result">{emp["EmployeeId"]}</span>
                                  <br/>
                                  <span className="result">{emp["FirstName"]} {emp["LastName"]}</span>
                                  <br/>
                                  <span className="result">{emp["Email"]}</span>
                                  <br/>
                                  <span className="result">{moment(emp["DateStarted"]).utc().format('L')}</span>
                                  <br/>
                                  <span className="result">{emp["DateLeft"]? `${moment(emp["DateLeft"]).utc().format('L')}`:""}</span>
                                  {emp["DateLeft"]?<br/>:<span>
                                    <span className="result">{emp["Title"]} in {emp["DepartmentName"]}</span>
                                    <br/>
                                    <span className="result">{emp["RoomNumber"]} in {emp["Building"]}</span>
                                    <br/>
                                  </span>}
                                  
                                  
                              </div>
                              <Link to={`newEmployee/${emp["EmployeeId"]}`}>
                                  <div className="one-edit">
                                      EDIT EMPLOYEE
                                  </div>
                              </Link>
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
