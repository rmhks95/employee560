import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Nav from './Nav';
import './One.css';
import Search from './Search';

class One extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: []
    }
    this.getOne = this.getOne.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getDepts = this.getDepts.bind(this);
    this.searchSuper = this.searchSuper.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    //this.getOne();
    this.getDepts();
    document.getElementById("department").style.display = "none";
    document.getElementById("supervisor").style.display = "none";
    document.getElementById("search-icon").style.display = "none";
  }

  // Retrieves the list of items from the Express app
  getOne(event){
    event.preventDefault();
    document.getElementById("one-list").style.display = "block";

    var employeeName = '';

    if(document.getElementById("selectId").value == "supervisor") {
        employeeName = document.getElementById("supervisor").value;
    }
    else if(document.getElementById("selectId").value == "department") {
        employeeName = document.getElementById("department").value;
    }
    else {
        employeeName = document.getElementById("employeeName").value;
    }

    var searchType = document.getElementById("selectId").value;

    console.log(searchType);
    console.log(employeeName);
      fetch('https://560project.azurewebsites.net/api/getEmployee/'+searchType+'/'+ employeeName)
      .then(res => res.json())
      .then(employee => {
        var list = [];
        employee.map(info=> list.push(info))
        this.setState({idNum:list})
      }).catch(err=> console.log(err))


  }

  handleSelectChange(){
      document.getElementById("department").value = '';
      document.getElementById("employeeName").value = '';
      document.getElementById("supervisor").value = '';

      if(document.getElementById("selectId").value == "supervisor") {
          document.getElementById("department").style.display = "none";
          document.getElementById("employeeName").style.display = "none";
          document.getElementById("search-icon").style.display = "block";
          document.getElementById("supervisor").style.display = "block";
      }
      else if(document.getElementById("selectId").value == "department") {
          document.getElementById("department").style.display = "block";
          document.getElementById("employeeName").style.display = "none";
          document.getElementById("search-icon").style.display = "none";
          document.getElementById("supervisor").style.display = "none";
      }
      else {
          document.getElementById("department").style.display = "none";
          document.getElementById("employeeName").style.display = "block";
          document.getElementById("search-icon").style.display = "none";
          document.getElementById("supervisor").style.display = "none";
      }
  }

  // Retrieves the list of items from the Express app
  getDepts = () => {
      fetch('https://560project.azurewebsites.net/api/getfields/department')
      .then(res => res.json())
      .then(info => {
          info.map(depts=> {
              var deptList = document.getElementById("departmentList")
              var newOptionElement = document.createElement("option");
              newOptionElement.textContent = depts["Name"];
              deptList.appendChild(newOptionElement);
          })
      }).catch(err=>console.log(err))
  }

  //used to search for employeeName
  searchSuper(event){
    document.getElementById("search-popup").style.display = "block";
  }

  render() {
    const { idNum } = this.state;
    return (
      <div className="App">
          <Nav></Nav>
          <h1>Find Employee</h1>
          <Search></Search>
          {/* Check to see if any items are found*/}
          <div className="input-container">
            <div className="input-title">
                  <select id="selectId" onChange={this.handleSelectChange}>
                      <option value="employee">:Enter Name or ID</option>
                      <option value="department">:Enter Department</option>
                      <option value="supervisor">:Enter Supervisor</option>
                  </select>
            </div>
              <input type="text" id="employeeName" className="input-result" onFocus={() => document.getElementById("employeeName").value = ''}></input>
              <input id="department" className="input-result" list="departmentList" onFocus={() => document.getElementById("department").value = ''} required></input><datalist id="departmentList"></datalist>
              <input type="text" id="supervisor" className="input-result" onFocus={() => document.getElementById("supervisor").value = ''}></input>
              <div id="search-icon" onClick={this.searchSuper}></div>
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
                                    {emp["Supervisor"]!=" "?<span className="title">Supervisor: </span>:""}
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
                                    {emp["Supervisor"]!=" "?<span className="result">{emp["Supervisor"]}</span>:""}
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
