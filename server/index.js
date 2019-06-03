const socketPORT = 8988;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const readline = require('readline');

app.listen(80);
app.get('/', function (req, res) {
  let message = req.query.message;
  io.emit('message', message);

  let html = message + " sent<br><form method='GET'><input type='text' name='message' autocomplete='off' autofocus></form>";
  res.send(html);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('Text:', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);

  io.emit('message', {"text": answer});


  rl.close();
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(socketPORT, function(){
  console.log(`listening on *:${socketPORT}`);
});
