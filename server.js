var SerialPort = require('serialport').SerialPort;
var sp = new SerialPort('/dev/ttyACM0');
var express = require('express');
var app = express();
var fs = require("fs");


app.get('/light', function (req, res) {
   var lightValue = Math.floor(Math.random() * 100)
   var response = { light: lightValue }
   console.log('light: ' + JSON.stringify(response))
   res.end(JSON.stringify(response)) 
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

// list serial ports:
//serialport.list(function (err, ports) {
//  ports.forEach(function(port) {
//    console.log(port.comName);
//  });
//});

sp.on('data', function(data) {
   var sensors = data.toString();
   console.log(sensors);
   
   
});

sp.on('error', function(err) {
  console.log(err);
});


