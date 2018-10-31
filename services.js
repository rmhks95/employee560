const sql = require('mssql')


sql.connect('mssql://username:password@localhost/database')

async function db(){
    try {
        const result = await sql.query`select * from mytable where id = ${value}`
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
  var list = [id];
  res.json(list);
}



module.exports = {getAll, getEmployee}
