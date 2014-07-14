speak = function (lang, text) {
    var uri = 'http://translate.google.com/translate_tts?';
    var enctext = 'q=' + encodeURI(text);
    var enclang = 'tl=' + encodeURI(lang);
    console.log(uri + enclang + '&' + enctext);
    //window.open(uri + enclang + '&' + enctext, 'speak', 'width=100, height=100');

   
    var base;
	var obj;

	base = document.getElementById('speaker');
	base.innerHTML = "";

	// IFRAME 作成
	obj = document.createElement("iframe");
	// IFRAME の見栄え属性をセット
	obj.setAttribute("frameBorder", "1");
	obj.setAttribute("scrolling", "no");

	// IFRAME の配置属性をセット
	obj.style.position = "relative";
	obj.style.width = "1px";
	obj.style.height = "1px";

	// IFRAME の内容をセット
	obj.src = uri + enclang + '&' + enctext;
	// IFRAME を実装
	base.appendChild(obj);
    
    /*
    $(this).jPlayer('setMedia', {
        title: 'gspeak',
        mp3: uri + enclang + '&' + enctext,
        supplied: 'mp3',
        swfPath: 'js'
    }).jPlayer('play');
    */
    return false;
};

