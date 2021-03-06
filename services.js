const sql = require('mssql')


sql.connect('mssql://grp23:Wildcats111@cis560.database.windows.net/Employee?encrypt=true')

async function getFields(req,res){
    const {name} = req.params;
    try {
        const query = `select * from Employee.${name}`
        const result = await sql.query(query)
        // sql.close()
        res.json(result["recordset"]);
    } catch (err) {
        // ... error checks
    }
}

async function getStats(req,res){
    try{
        const currently = await sql.query('EXEC Employee.getNumberOfEmployees');
        const pastYear = await sql.query('EXEC Employee.getPastYear')
        const countries = await sql.query('EXEC Employee.getNumberOfCountries')
        const totalSalary = await sql.query('EXEC Employee.getTotalSalary')

        const info ={
            "currently": currently["recordset"][0][''],
            "pastYear": pastYear["recordset"][0][''],
            "countries":countries["recordset"][0][''],
            "totalSalary":totalSalary["recordset"][0]['']
        }
        res.json(info)
    }catch(err){
        console.log(err)
        res.send().status(500)
    }

}

async function getAll(req,res){
  var list = await sql.query('SELECT * FROM employee.employee')
  res.json(list["recordset"])
}

async function getEmployee(req, res) {
  try {
    const {name} = req.params;
    var result =""

    if(!name.match(/\d+/g)){
        if(name.includes(" ")){
            var names = name.split(" ");
            console.log(names)
            //const result = await sql.query(`select * from Employee.Employee E where EmployeeId = ${id}`)
            result = await sql.query(`select
            E.EmployeeId,
            E.FirstName,
            E.LastName,
            E.Email,
            E.DateStarted,
            E.DateLeft,
            P.Title,
            O.Building,
            O.RoomNumber,
            D.Name as DepartmentName,
            E.SupervisorID,
            Concat(S.FirstName, ' ' , S.LastName) as Supervisor
            from Employee.Employee E
                left JOIN Employee.Employee S on E.SupervisorID= S.employeeid
                left JOIN Employee.Position P on E.PositionID = P.PositionID
                left JOIN Employee.Office O on E.OfficeID = O.OfficeID
                left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
            where  E.FirstName= '${names[0]}' and E.LastName = '${names[1]}'`)
        }else{
            result = await sql.query(`select
            E.EmployeeId,
            E.FirstName,
            E.LastName,
            E.Email,
            E.DateStarted,
            E.DateLeft,
            P.Title,
            O.Building,
            O.RoomNumber,
            D.Name as DepartmentName,
            E.SupervisorID,
            Concat(S.FirstName, ' ' , S.LastName) as Supervisor
            from Employee.Employee E
                left JOIN Employee.Employee S on E.SupervisorID= S.employeeid
                left JOIN Employee.Position P on E.PositionID = P.PositionID
                left JOIN Employee.Office O on E.OfficeID = O.OfficeID
                left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
            where  E.FirstName= '${name}' or E.LastName = '${name}'`)
        }
    }else{
        result = await sql.query(`select
        E.EmployeeId,
        E.FirstName,
        E.LastName,
        E.Email,
        E.DateStarted,
        E.DateLeft,
        P.Title,
        O.Building,
        O.RoomNumber,
        D.Name as DepartmentName,
        E.SupervisorID,
        Concat(S.FirstName, ' '  , S.LastName) as Supervisor
        from Employee.Employee E
            left JOIN Employee.Employee S on E.SupervisorID= S.employeeid
            left JOIN Employee.Position P on E.PositionID = P.PositionID
            left JOIN Employee.Office O on E.OfficeID = O.OfficeID
            left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
        where E.employeeID = ${name}`)
    }
      // console.log(result)

    res.json(result["recordset"])

  } catch (err) {
      console.log(err)
  }
  res.json(list);
}

async function getEmployeeSup(req, res) {
    try {
      const {name} = req.params;
      var result =""

      if(!name.match(/\d+/g)){
          if(name.includes(" ")){
              var names = name.split(" ");
              console.log(names)
              //const result = await sql.query(`select * from Employee.Employee E where EmployeeId = ${id}`)
              result = await sql.query(`select
              E.EmployeeId,
              E.FirstName,
              E.LastName,
              E.Email,
              E.DateStarted,
              E.DateLeft,
              P.Title,
              O.Building,
              O.RoomNumber,
              D.Name as DepartmentName,
              Concat(S.FirstName, ' ' , S.LastName) as Supervisor
              from Employee.Employee E
                  left JOIN Employee.Employee S on E.supervisorID = S.employeeID
                  left JOIN Employee.Position P on E.PositionID = P.PositionID
                  left JOIN Employee.Office O on E.OfficeID = O.OfficeID
                  left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
              where  S.FirstName= '${names[0]}' and S.LastName = '${names[1]}'`)
          }else{
              result = await sql.query(`select
              E.EmployeeId,
              E.FirstName,
              E.LastName,
              E.Email,
              E.DateStarted,
              E.DateLeft,
              P.Title,
              O.Building,
              O.RoomNumber,
              D.Name as DepartmentName,
              Concat(S.FirstName, ' '  , S.LastName) as Supervisor
              from Employee.Employee E
                  left JOIN Employee.Employee S on E.supervisorID = S.employeeID
                  left JOIN Employee.Position P on E.PositionID = P.PositionID
                  left JOIN Employee.Office O on E.OfficeID = O.OfficeID
                  left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
              where  S.FirstName= '${name}' or S.LastName = '${name}'`)
          }
      }else{
          result = await sql.query(`select
          E.EmployeeId,
          E.FirstName,
          E.LastName,
          E.Email,
          E.DateStarted,
          E.DateLeft,
          P.Title,
          O.Building,
          O.RoomNumber,
          D.Name as DepartmentName,
          Concat(S.FirstName, ' ' , S.LastName) as Supervisor
          from Employee.Employee E
              left JOIN Employee.Employee S on E.supervisorID = S.employeeID
              left JOIN Employee.Position P on E.PositionID = P.PositionID
              left JOIN Employee.Office O on E.OfficeID = O.OfficeID
              left JOIN Employee.Department D on E.DepartmentID = D.DepartmentID
          where S.employeeID = ${name}`)
      }
        // console.log(result)

      res.json(result["recordset"])

    } catch (err) {
        console.log(err)
    }
    res.json(list);
  }


  async function getEmployeeDept(req, res) {
    try {
      const {name} = req.params;
      var result =  await sql.query(`select
              E.EmployeeId,
              E.FirstName,
              E.LastName,
              E.Email,
              E.DateStarted,
              E.DateLeft,
              P.Title,
              O.Building,
              O.RoomNumber,
              D.Name as DepartmentName,
              Concat(S.FirstName, ' ' , S.LastName) as Supervisor
              from Employee.Employee E
                  left JOIN Employee.Employee S on E.supervisorID = S.employeeID
                  left JOIN Employee.Position P on E.PositionID = P.PositionID
                  left JOIN Employee.Office O on E.OfficeID = O.OfficeID
                  left JOIN Employee.Department D on E.departmentID = D.departmentID
              where D.Name= '${name}'`)
      res.json(result["recordset"])
    } catch (err) {
        console.log(err)
    }
}


async function newEmployee(req,res){
  const {idNum,firstName,lastName, startDate, email,position,office, department,supervisor} = req.body
  try {
    const officeParts = office.split(' in ');
    const query = `Insert into Employee.Employee(firstName, lastName, datestarted, email, positionid, officeid, departmentid,supervisorID)
    Values('${firstName}','${lastName}','${startDate}','${email}',
        (select positionID from Employee.Position P where P.Title='${position}'),
        (select officeID from Employee.Office O where O.RoomNumber = '${officeParts[0]}' and O.Building='${officeParts[1]}'),
        (select departmentID from Employee.Department D where D.Name = '${department}'),
        ${supervisor?`${supervisor}`:null})`
    const result = await sql.query(query)
    res.json(result)
  } catch (err) {
      console.log(err)
      res.json(err);
  }
}


  async function updateEmployee(req,res){
    try{
        const {idNum,firstName,lastName, startDate, dateLeft, email, position, office, department,supervisor} = req.body
        const officeParts = office.split(' in ');
        const query = `Update  Employee.Employee
            SET FirstName='${firstName}',
            LastName='${lastName}',
            dateStarted='${startDate}',
            ${dateLeft? `dateLeft = '${dateLeft}',`: ""}
            email='${email}',
            positionid=(select positionID from Employee.Position P where P.Title='${position}'),
            officeid=(select officeID from Employee.Office O where O.RoomNumber = '${officeParts[0]}' and O.Building='${officeParts[1]}'),
            departmentid =(select departmentID from Employee.Department D where D.Name = '${department}'),
            supervisorId= ${supervisor?`${supervisor}`:null}
            where EmployeeId='${idNum}'`
        const result = await sql.query(query)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.json(err);
    }
  }




module.exports = {getAll, getEmployee, newEmployee,getFields, getStats, updateEmployee,getEmployeeSup,getEmployeeDept}
