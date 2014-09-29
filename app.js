// set port and root directory of www server
var port = process.argv[2] == undefined ? 3000 : process.argv[2];
var rootdir = process.argv[3] == undefined ? 'www' : process.argv[3];
// set dictionary table
// dic: dictionary
// noun: Noun of dictionary without proper noun
var dictable = process.argv[4] == undefined ? 'fruit' : process.argv[4];

var portname = process.argv[5] == undefined ? '/dev/ttyUSB0' : process.argv[5];

/* debug: write current environments */
console.log('www port: ' + port);
console.log('www rootdir: ' + rootdir);
console.log('dictable: ' + dictable);
console.log('serial port file name: ' + portname);
console.log('');

// express
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
 
// all environments
app.set('port', process.env.PORT || port);
var morgan = require('morgan');
app.use(morgan( { format: 'dev' } ));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, rootdir)));

var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// sqlite
var sqlite = require('sqlite3')
var dicdb = new sqlite.Database('dic/dic.sqlite3');

// output
//require('date-utils');
var output = require('./src/output.js');
output.Open(portname, { });

// socket.io
var io = require('socket.io').listen(server);
io.set('log level', 1);
var modes = [ 'word', 'search' ];

var replace_escape_char = function (word) {
    if (word == undefined)
        return "";
    switch (word) {
        case "\"":
        case "\'":
            return "";
    }
    return word.replace('\"', '').replace('\'', '');
};

var dicprocess = function (socket, mode, data) {
    console.log('Got search request: text=' + data['text']);
    var text = replace_escape_char(data['text']);
    var dictable_text = replace_escape_char(data['table']);
    if (dictable_text == "")
        dictable_text = dictable;

    dicdb.each("select distinct * from " + dictable_text + " where " + 
            "vowel_pronunciation = \"" + text + "\" or " +
            "vowel_reading = \"" + text + "\" " +
            "order by cost asc limit 30;", 
        function (err, row) {
            if (err) {
                console.error("ERROR dicdb : " + err + "\n" + row);
                socket.emit("search_error", err);
            } else {
                // debug
                row.answer = output.ProcessWord(row.surface_form);
                
                socket.emit("search_result", row);
            }
        }, function () {
            //debug
            console.log("Called dicdb.each#complete");
            socket.emit("search_result_end", "")
        }
    );

    //if (mode == 'word')
    //    output.ProcessWord();
}

io.sockets.on('connection', function (socket) {
    for (var i = 0; i < modes.length; i++) {
        socket.on(modes[i], function (data) { dicprocess(socket, modes[i], data); });
    }
});

