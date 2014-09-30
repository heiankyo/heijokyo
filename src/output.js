var SerialPort = require('serialport').SerialPort;
var sport = null;
var openedport = false;

var Open = function(portname, options, callback) {
    if (portname == undefined) {
        console.error('output: open: portname must not be empty.');
        return;
    } else if (portname == 'disabled') {
        console.log('disabled serial port service');
        return;
    }

    if (options == undefined)
        options = { };

    sport = new SerialPort(portname, options);
    sport.open(function (error) {
        if (error) {
            console.error('failed to open serial port: ' + error);
        } else {
            openedport = true;
            console.log('opening serial port successfully');
        }
        if (callback != undefined)
            callback(error);
    });
    return;
};

var write = function (text) {
    /* argument 'text' has been reserved for future */
    if (openedport) {
        sport.write('a', function (err, results) {
            /* debug */
            console.log('output: ProcessWord: write: err: ' + err);
            console.log('output: ProcessWord: write: results: ' + results);
        });
        return true;
    } else {
        console.error('output: ProcessWord: Port is closed');
        return false;
    }
};

var ProcessWord = function(text) {
    switch (text) {
        case '何時':
            /* write to port */
            if (openedport)
                write(text);
            /* answer time */
            var dt = new Date();
            return ('現在の時刻は' + dt.getHours() +'時' + dt.getMinutes() + '分' + dt.getSeconds() + '秒です。');
    }

    return undefined;
};

module.exports = {
    Open: Open,
    ProcessWord: ProcessWord
};

