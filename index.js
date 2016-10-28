var webdriverio = require('webdriverio');
var http = require('http');

var credentials = { login: 'email@gmail.com', password: 'password' };
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

var events = [];

function Event(keyString, action) {
    this.key = keyString;
    this.execute = action;
}

events.push(new Event('weather ', function (msg,callback) {
    console.log(msg);
    var str = '' + msg;
    str = '' + escapeRegExp(str);
    str = '' + str.substring(str.indexOf('weather ') + 8);
    console.log(str);
    getWeather(str, function(weatherString){
        callback(weatherString);
    });
}));

events.push(new Event('@slackbot', function(msg,callback){
    callback('Slackbot, I am your father!!!');
}));

events.push(new Event('parrot party?', function(msg,callback){
    callback(':dealwithitparrot: :partyparrot: :reversecongaparrot: :sassyparrot: :shuffleparrot: :speedyparrot: :dealwithitparrot: :partyparrot: :reversecongaparrot: :sassyparrot: :shuffleparrot: :speedyparrot: :dealwithitparrot: :partyparrot: :reversecongaparrot: :sassyparrot: :shuffleparrot: :speedyparrot:', 'yes');
}));

events.push(new Event('refactoring', function(msg,callback){
    callback('This is not going to end well....');
}));

events.push(new Event('lol', function(msg,callback){
    callback('kek');
}));

events.push(new Event('@smiche', function(msg,callback){
    callback('Robots will take over the world.');
}));

events.push(new Event('joined #random', function(msg,callback){
    callback('Welcome my dear friend!');
}));

events.push(new Event('Hello', function(msg,callback){
    callback('Hello, we don\' bite, maybe.');
}));


var firstTime = true;
var oldMsg = [];
var freshMsg = [];

var browser = webdriverio
    .remote(options)
    .init()
    .url('https://junction2016.slack.com/messages/random/');

browser.setValue('#email', credentials.login).then(function () {
    browser.setValue('#password', credentials.password).then(function () {
        browser.click('#signin_btn');
        checker();
    });
});

var checker = function () {
    setTimeout(function () {
        browser.getText('.message_content .message_body').then(function (data) {
            var saveLater = data.slice();
            freshMsg = data.slice();
            for (var index in oldMsg) {
                if (freshMsg.indexOf(oldMsg[index]) > -1) {
                    freshMsg.splice(freshMsg.indexOf(oldMsg[index]), 1);
                }
            }

            oldMsg = saveLater.slice();
            if (!firstTime) {
                var copy = freshMsg.slice();
                handleMessages(copy);
            }

            if (data.length > 0) {
                firstTime = false;
            }
        });

        checker();
    }, 5000);
}


function handleMessages(messageArr) {
    console.log(messageArr);
    for (var index in messageArr) {
        var curString = messageArr[index];
        console.log(curString);
        for(var i in events){
            console.log('At key: '+ events[i].key);
            if(curString.indexOf(events[i].key) > -1){
                console.log('Matched!');
                events[i].execute(curString,sendMessage);
            }
        }
    }
}

function getWeather(city,callback) {
    console.log(city);
    http.get({
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=' + city + '&APPID=76f0f809ee20adaf19355bd2095d4dc3&units=metric'
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            var weatherMsg = '';
            weatherMsg = 'Longitude: ' + parsed.coord.lon + ' Latitude: ' + parsed.coord.lat +
                ' Temp: ' + parsed.main.temp + ' Pressure: ' + parsed.main.pressure +
                ' Humidity: ' + parsed.main.humidity + '% Wind: ' + parsed.wind.speed + ' For City: ' + parsed.name;
            if (parsed.weather != undefined && parsed.weather.length > 0) {
                weatherMsg += ' Skies: ' + parsed.weather[0].description;
            }
           callback(weatherMsg);
        });
    });
}

function sendMessage(message, type) {
    if (type == undefined)
        message = '```' + message + '```';
    else
        message = message;

    browser.setValue('#message-input', message).then(function () {
        browser.click('#message-input').then(function () {
            browser.keys('Enter');
        });
    });
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}