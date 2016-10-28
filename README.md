# Slack-less bot
Created as a result of boredom.
This slack bot is using firefox browser api + selenium to execute automated tasks.

### steps to run le app
>download selenium server jar
```sh
curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
```
>run the selenium server
```
java -jar selenium-server-standalone-2.53.1.jar
```

Configure your settings and do some random stuff, refactor perhaps?
check
```
var credentials = { login: 'email@gmail.com', password: 'password' };
```
To add your own command/event/action (call it whatevs you want)
use the constructor and push to events array:
```
var myEvent = Event('what time is it?',function(msg,callback){
    var now = new Date();
    callback(now.toString());
}
events.push(myEvent);
```

get some node version
```
npm install
node index.js
```
and the compulsory:

The MIT License (MIT)
=====================

Copyright © `2016` `Smiche`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
