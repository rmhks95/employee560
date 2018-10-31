const express = require('express');
const app = express();

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
