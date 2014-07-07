// require('date-utils');

var ProcessWord = function(text) {
    switch (text) {
        case '何時':
            var dt = new Date();
            return dt.toFormat('現在の時刻はHH24時MI分SS秒です。');
    }

    return undefined;
};

module.exports = {
    ProcessWord: ProcessWord
};
