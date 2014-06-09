Specification
===
  
* Client
`function AnalyzeImage(Image image)`
Description:  
    画像を解析して、母音を取得します。  
Arguments:  
    Image image:  
        解析する画像を指定します。  
Returns:  
    string vowel:  
        カタカナの母音を返します。  
Detail:  
    clmtrackrを使用して発話者の骨格などの輪郭を画像から取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
`function AnalyzeVideoStreamFromWebCam()`  
Description:  
    WebCamストリームをソースとして、母音を取得します。  
Arguments:  
    none  
Returns:  
    string vowel:  
        カタカナの母音を返します。  
Detail:  
    clmtrackrを使用して発話者の骨格などの輪郭をWebCamストリームから取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
`function AnalyzeStaticVideo()`  
Description:  
    ビデオをソースとして、母音を取得します。  
Arguments:  
    none  
Returns:  
    string: カタカナの母音を返します。  
Detail:  
    clmtrackrを使用して発話者の骨格などの輪郭をビデオから取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
`function SearchWord(string vowel, function callback)`  
Description:  
    文字列をサーバーに送信して検索するようリクエストします。  
Arguments:  
    string vowel:  
        送信する単語。通常、ひらがなまたはカタカナを指定します。漢字、英数字や記号を指定すると検索できません。  
    string callback:
    
Returns:  
    int:  
        0: 成功  
        1: 失敗  
Detail:  
    この関数は単に文字列をサーバーに送出することだけを行います。具体的には、次のコードを実行します。  
`socket.emit("word", vowel);`  
    そのため、検索結果はこの関数では取得できません。  
