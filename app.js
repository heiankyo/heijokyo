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

// sqlite
var sqlite = require('sqlite3')
var dicdb = new sqlite.Database('dic/dic.sqlite3');

// socket.io
var io = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    socket.on('word', function (data) {
        // undone
        //ProcessWord(data);
    });

    socket.on('search', function (data) {
        console.log('Got search request: text=' + data['text']);
        var result =  [];
        dicdb.each("select * from dic where vowel_pronunciation = \"" + data['text'] + "\" order by cost asc limit 20;", 
            function (err, row) {
                if (err) {
                    console.error("ERROR dicdb : " + err + "\n" + row);
                    socket.emit("search_error", err);
                } else {
                    // debug
                    //console.log(row);
                    result.push(row);
                    socket.emit("search_result", row);
                }
            }, function () {
                //debug
                console.log("Called dicdb.each#complete");
                //socket.emit("search_result", result);
                socket.emit("search_result_end", "")
            }
        );
    });
});
