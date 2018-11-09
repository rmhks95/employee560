const sql = require('mssql')


sql.connect('mssql://grp23:Wildcats111@cis560.database.windows.net/Employee?encrypt=true')
 
async function getDepartments(req,res){
    try {
        const result = await sql.query`select * from Employee.Department`
        // sql.close()
        res.json(result["recordset"]);
    } catch (err) {
        // ... error checks
    }
}


function getAll(req,res){
  var list = ["item1","item2", "item3"];
  res.json(list)
}

async function getEmployee(req, res) {
  try {
    const {id} = req.params;
    // const result =""
      //const result = await sql.query(`select * from Employee.Employee E where EmployeeId = ${id}`)
      const result = await sql.query(`select E.FistName,
      E.LastName,
      E.Email,
      P.Title,
      O.Building,
      O.OfficeID,
      D.Name
      from Employee.Employee E 
          INNER JOIN Employee.Position P on E.PositionID = P.PositionID
          INNER JOIN Employee.Office O on E.OfficeID = O.OfficeID
          INNER JOIN Employee.Department D on E.DepartmentID = D.DepartmentID 
      where EmployeeId = ${id}`)
      
      //console.log(result)
      res.json(result["recordset"])
  } catch (err) {
      // ... error checks
  }
  res.json(list);
}

async function custom(req,res){
  const {query} = req.body;
  try {
    // const result =""
    const result = await sql.query(query)
    console.log(result)
    res.json(result)
  } catch (err) {
      // ... error checks
  }
}

async function newEmployee(req,rest){
  const {value} = req.body;
  try {
    const result = await sql.query(`INSERT INTO Employee.Employee VALUES ${value}`)
    console.log(result)
    res.json(result)
  } catch (err) {
      // ... error checks
  }
}



module.exports = {getAll, getEmployee, custom, newEmployee,getDepartments}
