$(function () {
    var last_search_string = '';
    var results = "";

    var show_message = function (text) {
        $("#result").prepend('<p>' + text + '</p>');
    };

    /*var socket = io.connect(); */
    var dic = new dictionary(
    /* callback */
        function (d) {
            if (d != undefined) {
                if (d.surface_form != undefined)
                    results += d.surface_form + " ";
                if (d.answer != undefined) {
                    results += "「" + d.answer + "」 ";
                    speak('ja', d.answer);
                }
            }
        }, 
        /* endcallback */
        function (d) {
            console.log("endcallback");
            if (results == last_search_string) {
                results = "(そんなのないよ ありえない)";
                speak('ja', results);
            }
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
        last_search_string = results;
        dic.EmitWord(t, table);
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

