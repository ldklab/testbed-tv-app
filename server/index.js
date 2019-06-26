const socketPORT = 8988;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.listen(80);
app.get('/', function (req, res) {
  let message = req.query.message;
  io.emit('message', message);

  let html = message + " sent<br><form method='GET'><input type='text' name='message' autocomplete='off' autofocus></form>";
  res.send(html);
});

app.post('/', function (req, res) {
  let interaction = req.body;

  io.emit('interaction', interaction);

  res.status(201).send({"message": "notification request sent", "obj": interaction});
});

io.on('connection', function(socket){
  console.log('Incoming connection on Socket.io');

  socket.on('reply', function(reply) {
    console.log("New reply: ", reply);
  });
});


http.listen(socketPORT, function(){
  console.log(`listening on *:${socketPORT}`);
});
