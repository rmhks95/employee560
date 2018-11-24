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
        const currently = await sql.query('SELECT Count(*) FROM employee.employee E WHERE E.DateLeft IS NULL');
        const pastYear = await sql.query('SELECT Count(*) FROM employee.employee E WHERE E.DateStarted > DATEADD(year,-1,GETDATE())')
        const countries = await sql.query('SELECT Count(*) FROM employee.Country')
        
        const info ={
            "currently": currently["recordset"][0][''],
            "pastYear": pastYear["recordset"][0][''],
            "countries":countries["recordset"][0]['']
        }
        res.json(info)
    }catch(err){
        console.log(err)
        res.send().status(500)
    }

}

function getAll(req,res){
  var list = ["item1","item2", "item3"];
  res.json(list)
}

async function getEmployee(req, res) {
  try {
    const {name} = req.params;
    var result =""

    if(name.match(/\d+/g)){
        if(name.includes(" ")){
            var names = name.split(" ");
            
            //const result = await sql.query(`select * from Employee.Employee E where EmployeeId = ${id}`)
            result = await sql.query(`select
            E.EmployeeId,
            E.FirstName,
            E.LastName,
            E.Email,
            E.DateStarted,
            P.Title,
            O.Building,
            O.RoomNumber,
            D.Name as DepartmentName,
            E.SupervisorID
            from Employee.Employee E
                INNER JOIN Employee.Position P on E.PositionID = P.PositionID
                INNER JOIN Employee.Office O on E.OfficeID = O.OfficeID
                INNER JOIN Employee.Department D on E.DepartmentID = D.DepartmentID 
            where  E.FirstName= '${names[0]}' and E.LastName = '${names[1]}'`)
        }{
            result = await sql.query(`select
            E.EmployeeId,
            E.FirstName,
            E.LastName,
            E.Email,
            E.DateStarted,
            P.Title,
            O.Building,
            O.RoomNumber,
            D.Name as DepartmentName,
            E.SupervisorID
            from Employee.Employee E
                INNER JOIN Employee.Position P on E.PositionID = P.PositionID
                INNER JOIN Employee.Office O on E.OfficeID = O.OfficeID
                INNER JOIN Employee.Department D on E.DepartmentID = D.DepartmentID 
            where  E.FirstName= '${name}' or E.LastName = '${name}'`)
        }
    }else{
        result = await sql.query(`select
        E.EmployeeId, 
        E.FirstName,
        E.LastName,
        E.Email,
        E.DateStarted,
        P.Title,
        O.Building,
        O.RoomNumber,
        D.Name as DepartmentName,
        E.SupervisorID
        from Employee.Employee E
            INNER JOIN Employee.Position P on E.PositionID = P.PositionID
            INNER JOIN Employee.Office O on E.OfficeID = O.OfficeID
            INNER JOIN Employee.Department D on E.DepartmentID = D.DepartmentID 
        where E.employeeID = ${name}`)
    }
      // console.log(result)

    res.json(result["recordset"])
    
  } catch (err) {
      console.log(err)
  }
  res.json(list);
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
        '${supervisor}')`
    const result = await sql.query(query)
    res.json(result)
  } catch (err) {
      console.log(err)
      res.json(err);
  }
}


  async function updateEmployee(req,res){
    try{
        const {idNum,firstName,lastName, startDate, dateEnded, email, position, office, department,supervisor} = req.body
        const officeParts = office.split(' in ');
        const query = `Update  Employee.Employee
            SET FirstName='${firstName}',
            LastName='${lastName}',
            dateStarted='${startDate}',
            dateEnded = ${dateEnded},
            email='${email}',
            positionid=(select positionID from Employee.Position P where P.Title='${position}'), 
            officeid=(select officeID from Employee.Office O where O.RoomNumber = '${officeParts[0]}' and O.Building='${officeParts[1]}'),
            departmentid =(select departmentID from Employee.Department D where D.Name = '${department}'),
            supervisorId= '${supervisor}'
            where EmployeeId='${idNum}'`
        const result = await sql.query(query)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.json(err);
    }
  }




module.exports = {getAll, getEmployee, newEmployee,getFields, getStats, updateEmployee}
