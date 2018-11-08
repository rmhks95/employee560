const sql = require('mssql')


sql.connect('mssql://username:password@localhost/database')

 async function db(){
    try {
      // const result =""
        const result = await sql.query(`select * from mytable where id = ${value}`)
        console.log(result)
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
      const result = await sql.query(`select * from mytable where id = ${value}`)
      console.log(result)
      res.json(9)
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
    // const result =""
    const result = await sql.query(`INSERT INTO mytable() VALUES ${value}`)
    console.log(result)
    res.json(result)
  } catch (err) {
      // ... error checks
  }
}



module.exports = {getAll, getEmployee, custom, newEmployee}
