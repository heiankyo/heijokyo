Specification
===
  
## Client
### `function AnalyzeImage(Image image)`  
* Description: 画像を解析して、母音を取得します。  
* Arguments:  
    * `Image image`: 解析する画像を指定します。  
* Returns:  
    * `string`: カタカナの母音を返します。  
* Detail:  clmtrackrを使用して発話者の骨格などの輪郭を画像から取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
### `function AnalyzeVideoStreamFromWebCam()`  
* Description: WebCamストリームをソースとして、母音を取得します。  
* Arguments: `none`  
* Returns:  
    `string`: カタカナの母音を返します。  
* Detail: clmtrackrを使用して発話者の骨格などの輪郭をWebCamストリームから取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
### `function AnalyzeStaticVideo()`  
* Description: ビデオをソースとして、母音を取得します。  
* Arguments: `none ` 
* Returns:  
    `string`: カタカナの母音を返します。  
* Detail: clmtrackrを使用して発話者の骨格などの輪郭をビデオから取得し、発話者の口と最も近いと思われるカタカナの文字列を取得します。  
  
### `function SearchWord(string vowel, function callback, function endcallback, function errorcallback)`  
* Description: 文字列をサーバーに送信して検索するようリクエストします。  
* Arguments:  
    * `string vowel`: 送信する単語。通常、ひらがなまたはカタカナを指定します。漢字、英数字や記号を指定すると検索できません。  
    * `function callback( { } )`: 検索結果を受信した時に呼び出される関数。ハッシュ配列は、インデックスに辞書のテーブル、コンテントに結果が入ります。この関数は複数の検索結果があるときは複数回呼び出されます。  
    `function endcallback()`: すべての検索結果の送信が終わった時に呼び出される関数。  
    * `function errorcallback(err)`: 検索できなかった時に呼び出される関数。 `err` には、 Nodejs の `sqlite3` モジュールの `err` が入ります。  
* Returns:  
    * `int`: `0`: 成功, `1`: 失敗  
* Detail: この関数は文字列をサーバーに送信して、サーバーが検索し、検索結果をコールバックします。具体的には、次のコードを実行します。  
`socket.removeListener("search_result", SearchWordLastCallback);
socket.removeListener("search_end", SearchWordLastEndCallback)
socket.removeListener("search_error", SearchWordLastErrorCallback)
socket.on("search_result", callback);
socket.on("search_result_end", callback);
socket.on("search_error", errorcallback);
socket.emit("search", vowel);`
この関数はサーバーに送信する前に前回のコールバックの登録を解除します。


0|surface_form|text|0||0
1|left_id|int|0||0
2|right_id|int|0||0
3|cost|int|0||0
4|pos0|text|0||0
5|pos1|text|0||0
6|pos2|text|0||0
7|pos3|text|0||0
8|inflected_forms|text|0||0
9|utilizing_type|text|0||0
10|original_form|text|0||0
11|reading|text|0||0
12|pronunciation|text|0||0
13|vowel_reading|text|0||0
14|vowel_pronunciation|text|0||0

