$(function () {
    var results = "";
    var show_message = function (text) {
        $("#result").prepend('<p>' + text + '</p>');
    };

    /*var socket = io.connect(); */
    var dic = new dictionary(
    /* callback */
        function (d) {
            if (d != undefined && d.surface_form != undefined)
                results += d.surface_form + " ";
        }, 
        /* endcallback */
        function (d) {
            console.log("endcallback");
            if (results == "")
                results = "(そんなのないよ ありえない)";
            show_message(results);
            results = "";
        },
        /* enderrorcallback */
        function (d) {
            console.log("enderrorcallback");
            show_message("ERROR occured while searching text: ", d);
        }
    );

    var search = function (table) {
        results = "";
        var t = $("#search_textbox").val();
        if (t == "") return;
        results = t + ": ";
        dic.SearchWord(t, table);
        $('#search_textbox').val("");
    };

    $('#search_button').click(function () {
        search($('#search_table').val());
    });
 
    $("#search_textbox").keypress(function (e) {
        if (e.which == 13)
            search($('#search_table').val());
    });

    $("#search_table").val("noun");

});

