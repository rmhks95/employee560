import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './Search.css';

class One extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: []
    }
    this.getOne = this.getOne.bind(this);
    this.selectSuper = this.selectSuper.bind(this);
    this.searchClose = this.searchClose.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    //this.getOne();
  }

  selectSuper(id){
    document.getElementById("supervisor").value = id;
    document.getElementById("search-popup").style.display = "none";
  }

  searchClose(){
    document.getElementById("search-popup").style.display = "none";
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
      <div className="App" id="search-popup">
        <div id="search-close" onClick={this.searchClose}></div>
          {/* Check to see if any items are found*/}
          <div className="input-container">
            <div className="input-title">
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
                                  <span className="result">{emp["FirstName"]} {emp["LastName"]}</span>
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
                              <div className="one-edit" value={emp["EmployeeId"]} id="search-button" onClick={() => {this.selectSuper(emp["EmployeeId"])}}>
                                      SELECT EMPLOYEE
                              </div>
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
