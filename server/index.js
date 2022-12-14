var colors = require('colors');
colors.setTheme({
  warn: 'yellow',
  debug: 'cyan',
  error: ['yellow', 'bgRed']
});
var generateSafeId = require('generate-safe-id');
var deviceID = generateSafeId();

const socketPORT = 8988;
const API_PORT = 80;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

const request = require('request');

var API_URL;

// ---------- DISCOVERY PROTOCOL ----------
var UDP_PORT = 3017;
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var ip = require("ip");
// ---------- END DISCOVERY PROTOCOL ----------

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// ---------- BINDINGS ----------
// API Listening
app.listen(API_PORT, () => console.log(colors.debug('HTTP API listening on ' + ip.address() + ':' + API_PORT)) );

// Socke.io Listening
http.listen(socketPORT, () => console.log(colors.debug('Socket.io listening on '+ip.address()+':'+ socketPORT)) );

// UDP Listening
client.on('listening', function () {
  var address = client.address();
  console.log(colors.debug('UDP Server listening on ' + address.address + ":" + address.port));
  client.setBroadcast(true);
});
client.bind(UDP_PORT);
// ---------- END BINDINGS ----------



// ---------- API ROUTES ----------
app.post('/', function (req, res) {
  let interaction = req.body;

  console.log('Interaction: ', interaction);
  io.emit('interaction', interaction);

  res.status(201).send({"message": "notification request sent", "interaction": interaction});
});
// ---------- END API ROUTES ----------



// ---------- SOCKET.IO ROUTES ----------
io.on('connection', function(socket){
  console.log(colors.warn('Incoming connection on Socket.io'));

  socket.on('reply', function(reply) {
    console.log("New reply: ", reply);

    let FULL_API_URL = API_URL+'/interactions/'+reply._id;
    console.log('Full API URL: ' + FULL_API_URL);

    request.put({
      url: FULL_API_URL,
      body: {data: reply.inputs},
      json: true
    }, function(error, response, body){
      console.log("API Body: ", body);
      if(error) {
        console.log(colors.error(error));
      }
    });

  });
});
// ---------- END SOCKET.IO ROUTES ----------



// ---------- UDP ROUTES ----------
client.on('message', function (message, rinfo) {
  var myObj = JSON.parse(message);

  console.log('Message: ', myObj);
  if(myObj.deviceType === 'TV') {
    console.log("Sending back to addr: " + rinfo.address + ":" + rinfo.port + '[deviceID: ' + deviceID + ']');

    API_URL = myObj.API_URL;

    var deviceInfo = {
      "deviceID": deviceID,
      "name": "My Smart TV",
      "address": ip.address(),
      "port": 80,
      "timestamp": Date.now(),
      "capabilities": {
          "in": ["text"],
          "out": ["text", "video", "audio", "notification"]
        }
      }

    var messageReply = new Buffer.from(JSON.stringify(deviceInfo));
    client.send(messageReply, 0, messageReply.length, rinfo.port, rinfo.address, function() {

    });
  }
});
// ---------- END UDP ROUTES ----------

