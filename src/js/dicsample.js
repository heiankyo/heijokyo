$(function () {
    var socket = io.connect();
    var results = "";

    var show_message = function (text) {
        $("#result").append('<p>' + text + '</p>');
    };

    var search = function () {
        results = "";
        socket.emit('search', { text: $('#search_textbox').val() } );
        $('#search_textbox').val(""); 
    };

    socket.on('connect', function () {
        show_message('socket.io connected');
    });

    socket.on('disconnect', function () {
        show_message('socket.io disconnected');
    });

    socket.on('search_result', function (d) {
        /*
        var output = "";
        for (var item in d)
            output += item.surface_form + " ";
        show_message(output);
        */
        results += d.surface_form + " ";
        //show_message(d.surface_form);
    });

    socket.on('search_result_end', function (d) {
        if (results == "")
            results = "(Not found)";
        show_message(results);
         results = "";
    });


    socket.on('search_error', function (d) {
        show_message("ERROR occured while searching text: " + d);
    });

    $('#search_button').click(function () {
        search();
    });
    
    $("#search_textbox").keypress(function (e) {
        if (e.which == 13)
            search();
    });
});
