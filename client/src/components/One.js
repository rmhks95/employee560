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
              Enter Name or ID: <input type="text" id="employeeName"></input>
            <button type="submit" onClick={this.getOne}>Submit</button>

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
                                  <span className="title">Started On: </span>
                                  <br/>
                                  <span className="title">{emp["DateLeft"]? `Date Left: `:""}</span>
                                  {emp["DateLeft"]?<br/>:""}
                                  <span className="title">Email: </span>
                                  <br/>
                                  <span className="title">Position: </span>
                                  <br/>
                                  <span className="title">Office: </span>
                                  <br/>
                              </div>
                              <div id="one-results">
                                  <span className="result">{emp["EmployeeId"]}</span>
                                  <br/>
                                  <span className="result">{moment(emp["DateStarted"]).format('L')}</span>
                                  <br/>
                                  <span className="result">{emp["DateLeft"]? `${moment(emp["DateLeft"]).format('L')}`:""}</span>
                                  {emp["DateLeft"]?<br/>:""}
                                  <span className="result">{emp["Email"]}</span>
                                  <br/>
                                  <span className="result">{emp["Title"]} in {emp["DepartmentName"]}</span>
                                  <br/>
                                  <span className="result">{emp["RoomNumber"]} in {emp["Building"]}</span>
                                  <br/>
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
