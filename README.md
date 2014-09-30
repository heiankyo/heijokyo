heijokyo
========

A web-application that reads the contents of the statement by the movement of the mouth.

How to run
---
Just `npm install` and `node app.js [port-number [www-root-directory [dictionary-table-name [serial-port-name]]]]`

`port-number` gives port number which listen HTTP and WebSocket server. Usually, port 1 to 1023 need root privilege. Default is 3000.  
`www-root-directory` gives HTTP root directory. Default is '`www`'.  
`dictionary-table-name` gives a table name of dic.sqlite3. You can select below. Default is '`fruit`'  
`serial-port-name` gives serial port file name which send signal to PIC such as `/dev/ttyUSB0`. Default is `/dev/ttyUSB0`.  
* dic: all POS (noun., verb., adj. and so on)
* noun: nouns only (excluding proper nouns)
* fruit: names of some fruits (including "何時")

Requires
---
* node.js
* sqlite3
 
Troubleshooting
---
* Can't find sqlite3 module  
    on 64-bit PC?
    Type `npm install sqlite3 --target_arch=x64` to install sqlite3 64-bit version


