var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var sp = new SerialPort('/dev/ttyACM0', {
   parser: serialport.parsers.readline('\n')
});

var express = require('express');
var app = express();

var sLight = '';

app.get('/light', function (req, res) {
   var lightValue = Math.floor(Math.random() * 100)
   var response = { light: sLight }
   console.log('light: ' + JSON.stringify(response))
   res.end(JSON.stringify(response)) 
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

sp.on('data', function(data) {
   var sensors = data.toString();
   console.log(sensors);
   var match = 'Luminosidade = ';
   var startLight = sensors.search(match) + match.length; 
   var endLight = sensors.indexOf(' | Sensor')
   sLight = sensors.substring(startLight, endLight)
   console.log('sLight:' + sLight)
});

sp.on('error', function(err) {
  console.log(err);
});


