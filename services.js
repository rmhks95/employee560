const sql = require('mssql')


sql.connect('mssql://username:password@localhost/database')

async function db(){
    try {
        const result = await sql.query(`select * from mytable where id = ${value}`)
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}

function getAll(req,res){
  var list = ["item1","item2", "item3"];
  res.json(list)
}

function getEmployee(req, res) {
  const {id} = req.params;

  res.json(list);
}

function custom(req,res){
  const {query} = req.body;
  try {
    const result = await sql.query(query)
    console.dir(result)
    res.json(result)
  } catch (err) {
      // ... error checks
  }
}

function newEmployee(req,rest){
  const {value} = req.body;
  try {
    const result = await sql.query(`INSERT INTO mytable() VALUE ${value}`)
    console.dir(result)
    res.json(result)
  } catch (err) {
      // ... error checks
  }
}



module.exports = {getAll, getEmployee, custom, newEmployee}
