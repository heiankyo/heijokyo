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
  
### `class dictionary(function callback, function endcallback, function errorcallback)`
* Description: 辞書を使用するための関数を提供します。
* Arguments:
    * `function search_callback( . )` 検索結果を受信した時に呼び出される関数。メンバ変数として返されます。この関数は複数の検索結果があるときは複数回呼び出されます。  
    * `function endcallback()`: すべての検索結果の送信が終わった時に呼び出される関数。  
    * `function errorcallback(err)`: 検索できなかった時に呼び出される関数。 `err` には、 Nodejs の `sqlite3` モジュールの `err` が入ります。  
* Usage:  

    var dic = new dictionary(  
        function (d) { $('#output').prepend(d.surface_form); },  
        function () { $('#output').prepend('finished!'); },  
        function (d) { $('#output').prepend('ERROR! ', d); });  
    dic.SearchWord('うい');  
  
#### `function SearchWord(string vowel)`  
* Description: 文字列をサーバーに送信して検索するようリクエストします。これには socket.io を使い、可能ならば WebSocket 通信を行います。  
* Arguments:  
    * `string vowel`: 送信する単語。通常、ひらがなまたはカタカナを指定します。漢字、英数字や記号を指定すると検索できません。  
* Returns:  
    * `int`: `0`: 成功, `1`: 失敗  
* Detail: この関数は文字列をサーバーに送信して、サーバーが検索し、検索結果をコールバックします。具体的には、次のコードを実行します。  
   socket.emit("search", vowel);  
ひらがなはカタカナに変換されます。

#### `function EmitWord(string vowel, function callback, function endcallback, function errorcallback)`
* Description: 文字列をサーバーに送信してサーバー側で何かを実行するようリクエストします。これには socket.io を使い、可能ならば WebSocket 通信を行います。
* Arguments: `SearchWord` を参照のこと。
 * Detail: この関数は上の `SearchWord` とは検索したあとに何かを実行するという点で異なります。それ以外は同じです。具体的には、次のコードを実行します。  
    socket.emit("word", vowel);

## Server
### socket.io
#### `search( { text: vowel} )`
* Description: 指定した文字列を検索し、検索結果をクライアントに返します。  
* Arguments:  
    * vowel: 検索する文字列。通常、カタカナを指定します。漢字、英数字や記号を指定すると検索できません。  
* Returns: `{ . }`: SQLite3 の辞書を検索した結果。 `Dictionary` 参照。  
* Detail: 指定した文字列を `dic/dic.sqlite3` から検索し、検索結果をクライアントに返します。戻り値はハッシュ配列として Nodejs の `sqlite3` モジュールから直接返された配列を返します。  

#### `word( { text: vowel } )`
* Description: 指定した文字列を検索し、検索結果をクライアントに返し、検索結果をもとになにか実行します。  
* Arguments: `search` に同じ。  
* Returns: `search` に同じ。  
* Detail: `search` に同じ。ただし、検索結果をもとになにか実行する点では異なります。  

### Output
#### `function output.ProcessWord(hash data)`
* Description: 指定した辞書の行から処理をします。
* Arguments: `data`: `{ . }` メンバ変数で指定する辞書の行。
* Returns: `int`: 0=成功, 任意の整数値=失敗
* Detail: none

### Dictionary
#### Columns

|number|name|type|
|--:|:--|:--|
|0|surface_form|text|
|1|left_id|int|
|2|right_id|int|
|3|cost|int|
|4|pos0|text|
|5|pos1|text|
|6|pos2|text|
|7|pos3|text|
|8|inflected_forms|text|
|9|utilizing_type|text|
|10|original_form|text|
|11|reading|text|
|12|pronunciation|text|
|13|vowel_reading|text|
|14|vowel_pronunciation|text|


