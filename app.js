// set port and root directory of www server
var port = process.argv[2] == undefined ? 80 : process.argv[2];
var rootdir = process.argv[3] == undefined ? 'src' : process.argv[3];

// express
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
 
// all environments
app.set('port', process.env.PORT || port);
//app.use(require('static-favicon'));
var morgan = require('morgan');
app.use(morgan( { format: 'dev' } ));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(require('method-override'));
//app.use(app.router);
app.use(express.static(path.join(__dirname, rootdir)));

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.io
var io = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    socket.on('word', function (data) {
        ProcessWord(data);
    });

});

