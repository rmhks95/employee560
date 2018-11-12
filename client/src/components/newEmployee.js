import React, { Component } from 'react';
import moment from 'moment';

class newEmployee extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: []
    }
    this.makeEmployee = this.makeEmployee.bind(this);
    this.getDepts = this.getDepts.bind(this);
    this.getPositions = this.getPositions.bind(this);
    this.getOffices = this.getOffices.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getDepts();
    this.getOffices();
    this.getPositions();
  }

  // Retrieves the list of items from the Express app
  makeEmployee(){
    var newEmployee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        startDate: document.getElementById("startDate").value,
        email: document.getElementById("email").value,
        position: document.getElementById("position").value,
        office: document.getElementById("office").value,
        department: document.getElementById("department").value
    }

    fetch('https://560project.azurewebsites.net/api/newEmployee/',{
        method: 'POST',
        body: JSON.stringify(newEmployee),
        headers:{
            'Content-Type': 'application/json'
          }
      })
    .then(res => res.json())
    .then(info => console.log(info))
    .catch(err=> console.log(err))
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

    getPositions = () => {
        fetch('https://560project.azurewebsites.net/api/getfields/position')
        .then(res => res.json())
        .then(info => {
          info.map(position=> {
              var posList = document.getElementById("positionList")
              var newOptionElement = document.createElement("option");
              newOptionElement.textContent = position["Title"];
              posList.appendChild(newOptionElement);
            })
        }).catch(err=>console.log(err))
    }

    getOffices = () => {
        fetch('https://560project.azurewebsites.net/api/getfields/office')
        .then(res => res.json())
        .then(info => {
          info.map(office=> {
              var offList = document.getElementById("officeList")
              var newOptionElement = document.createElement("option");
              newOptionElement.textContent = office["RoomNumber"] + " in "+ office["Building"];
              offList.appendChild(newOptionElement);
            })
        }).catch(err=>console.log(err))
    }

  render() {
    return (
      <div className="App">
      <h1>New Employee</h1>
      {/* Check to see if any items are found*/}
        First Name: <input type="text" id="firstName"></input>
        Last Name: <input type="text" id="lastName"></input>
        Start Date <input type="date" id="startDate"></input>
        Email: <input type="text" id="email"></input>
        Position: <input id="position" list="positionList"></input><datalist id="positionList"></datalist>
        Office: <input id="office" list="officeList"></input><datalist id="officeList"></datalist>
        Department: <input id="department" list="departmentList"></input><datalist id="departmentList"></datalist>
        <button type="submit" onClick={this.makeEmployee}>Submit</button>
      {false ? (
          <div><br></br>
                <div>
                {/* Employee: {idNum.map((emp,index)=>{ 
                  return(
                    <div>
                      Name: {emp["FirstName"]} {emp["LastName"]}
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
                    </div>
                  )})} */}
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

export default newEmployee;
