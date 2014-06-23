var dictionary = function (search_callback, search_endcallback, search_errorcallback) {
    var socket = io.connect();
    socket.on('connect', function () {
        console.log('socket.io connected');
    });

    socket.on('disconnect', function () {
        console.log('socket.io disconnected');
    });

    /* ひらがなをカタカナに変更 */
    var HiraganaToKatakana = function (vowel) {
        return vowel.replace(/[ぁ-ん]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60)
        });
    };

    socket.on("search_result", search_callback);
    socket.on("search_result_end", search_endcallback);
    socket.on("search_error", search_errorcallback);

    var _EmitWord = function (mode, vowel) {
        /* check */
        if (vowel == "")
            return 1;
        vowel = HiraganaToKatakana(vowel);
        socket.emit(mode, { text: vowel } );
        return 0;
    };


    this.EmitWord = function (vowel) {
        return _EmitWord("word", vowel);
    };
    
    this.SearchWord = function (vowel) {
        return _EmitWord("search", vowel);
    };
};

