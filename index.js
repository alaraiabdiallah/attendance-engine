var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var rc522 = require("rc522");
var db = require('./db');

app.use(express.static('public'));


const PORT = process.env.PORT || 3000;


server.listen(PORT, function (err) {
    if (err) throw err
    console.log('listening on port '+PORT);
});


app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/hallo',(req,res)=>{
    res.send("hallo");
})

io.on('connection',(client) => {

  console.log("Connected with id: "+client.id);

  client.on('tap', (data) => {
    console.log(data);
  });

  client.on('disconnect', () => {
    console.log('client disconnect...', client.id);
  });

  client.on('error', (err) => {
    console.log('received error from client:', client.id)
    console.log(err)
  })

})

rc522(function(rfidSerialNumber){
  console.log(rfidSerialNumber);  
  io.emit('tap', {
        machine: 1,
        uuid: rfidSerialNumber
    })
});



