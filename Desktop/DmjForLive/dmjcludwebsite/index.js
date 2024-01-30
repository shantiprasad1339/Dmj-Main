const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express()
// app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(8080, () => {
  console.log("Bms Is Live")
})