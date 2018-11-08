const sql = require('mssql')

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'grp23', // update me
     password: 'Wildcats111', // update me
     server: 'cis560.database.windows.net', // update me
     options: 
        {
           database: 'Employee' //update me
           , encrypt: true
        }
   }

//sql.connect('mssql://username:password@localhost/database')

sql.connect('mssql://grp23:Wildcats111@cis560.database.windows.net/Employee?encrypt=true')

// // Attempt to connect and execute queries if connection goes through
// connection.on('connect', function(err) 
//    {
//      if (err) 
//        {
//           console.log(err)
//        }
//     else
//        {
//            get()
//        }
//    }
//  );


 
async function get(req,res){
    try {
        
        const result = await sql.query`select * from Employee.Department`

        res.json(result["recordset"]);
    } catch (err) {
        // ... error checks
    }
}



function huh(){ 
  
    console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          "SELECT * FROM Employee.Department",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    //process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
           res.json("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }



 async function no(){
  db.open(cn, function (err) {
    if (err) return console.log(err);
    
    db.query('select * from Employee.Employee', function (err, data) {
      if (err) console.log(err);
      
      console.log(data);
   
      db.close(function () {
        console.log('done');
      });
    });
  });
}

function getAll(req,res){
  var list = ["item1","item2", "item3"];
  res.json(list)
}

async function getEmployee(req, res) {
  try {
    const {id} = req.params;
    // const result =""
      //const result = await sql.query(`select * from mytable where id = ${value}`)
      //console.log(result)
      res.json(id)
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



module.exports = {getAll, getEmployee, custom, newEmployee,get}
