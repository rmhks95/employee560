import React, { Component } from 'react';
import moment from 'moment';
import Nav from './Nav';

class newEmployee extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      idNum: this.props.match.params.idNum

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
    if(this.state.idNum!=="0")this.findPerson();
  }

  findPerson(){
    fetch('https://560project.azurewebsites.net/api/getEmployee/'+ this.state.idNum)
    .then(res => res.json())
    .then(employee => {
        console.log(employee[0]["DateLeft"])
        document.getElementById("firstName").value = employee[0]["FirstName"]
        document.getElementById("lastName").value = employee[0]["LastName"]
        document.getElementById("startDate").value = moment(employee[0]["DateStarted"]).format("YYYY-MM-DD")
        if(employee[0]["DateLeft"])document.getElementById("dateLeft").value = moment(employee[0]["DateLeft"]).format('YYYY-MM-DD')
        document.getElementById("email").value = employee[0]["Email"]
        document.getElementById("position").value = employee[0]["Title"]
        document.getElementById("office").value = employee[0]["RoomNumber"] +" in " + employee[0]["Building"]
        document.getElementById("department").value = employee[0]["DepartmentName"]
        var supervisor = document.getElementById("supervisor")
        supervisor.value = employee[0]["SupervisorID"]
        supervisor.title= employee[0]["SupFirst"] + " " + employee[0]["SupLast"]
        supervisor.alt = employee[0]["SupFirst"] + " " + employee[0]["SupLast"]
    }).catch(err=> console.log(err))
  }

  // Retrieves the list of items from the Express app
  makeEmployee(){
    var newEmployee = {
        idNum: this.state.idNum,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        startDate: document.getElementById("startDate").value,
        dateLeft: document.getElementById("dateLeft").value,
        email: document.getElementById("email").value,
        position: document.getElementById("position").value,
        office: document.getElementById("office").value,
        department: document.getElementById("department").value,
        supervisor: document.getElementById("supervisor").value
    }
    console.log(this.state.idNum)
    if(this.state.idNum==="0"){
        fetch('https://560project.azurewebsites.net/api/newEmployee/',{
            method: 'POST',
            body: JSON.stringify(newEmployee),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(info => {
            if(info.code !== "EREQUEST"){
                document.getElementById("firstName").value="";
                document.getElementById("lastName").value="";
                document.getElementById("startDate").value="";
                document.getElementById("email").value="";
                document.getElementById("position").value="";
                document.getElementById("office").value="";
                document.getElementById("department").value="";
                document.getElementById("supervisor").value = "";
                setTimeout(function () {
                    document.getElementById("alarmmsg").innerHTML = "Employee Added";
                }, 3000);

                // Now remove alarmmsg's content.
                document.getElementById("alarmmsg").innerHTML = "";
            }else{
                setTimeout(function () {
                    document.getElementById("alarmmsg").innerHTML = "Failed to Add Employee";
                }, 3000);

                // Now remove alarmmsg's content.
                document.getElementById("alarmmsg").innerHTML = "";
            }
        })
        .catch(err=> {
            console.log(err)

        })
    }else{
        console.log(newEmployee)
        fetch('https://560project.azurewebsites.net/api/updateEmployee/',{
            method: 'POST',
            body: JSON.stringify(newEmployee),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(info => {
            if(info.code !== "EREQUEST"){
                document.getElementById("firstName").value="";
                document.getElementById("lastName").value="";
                document.getElementById("startDate").value="";
                document.getElementById("email").value="";
                document.getElementById("position").value="";
                document.getElementById("office").value="";
                document.getElementById("department").value="";
                document.getElementById("supervisor").value = "";
                setTimeout(function () {
                    document.getElementById("alarmmsg").innerHTML = "Employee Updated";
                }, 3000);

                // Now remove alarmmsg's content.
                document.getElementById("alarmmsg").innerHTML = "";
            }else{
                setTimeout(function () {
                    document.getElementById("alarmmsg").innerHTML = "Failed to Add Employee";
                }, 3000);

                // Now remove alarmmsg's content.
                document.getElementById("alarmmsg").innerHTML = "";
            }
        })
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
      <Nav></Nav>
      <h1>{this.state.idNum==="0"?"New Employee":"Update Employee"}</h1>
        <h2 id="alarmmsg"></h2>
            First Name: <input type="text" id="firstName" required></input>
            Last Name: <input type="text" id="lastName" required></input>
            Start Date: <input type="date" id="startDate" required></input>
            {this.state.idNum!=="0" ? <div>Date Left: <input type="date" id="dateLeft"></input></div>: ""}
            Email: <input type="text" id="email" required></input>
            Position: <input id="position" list="positionList" required></input><datalist id="positionList"></datalist>
            Office: <input id="office" list="officeList" required></input><datalist id="officeList"></datalist>
            Department: <input id="department" list="departmentList" required></input><datalist id="departmentList"></datalist>
            Supervisor ID: <input type="text" id="supervisor" required></input>
            <button type="submit" onClick={this.makeEmployee}>Submit</button>

      </div>
    );
  }
}

export default newEmployee;
