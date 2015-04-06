var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

// Github username
var username = 'bradcerasani';
var url = 'https://github.com/users/' + username + '/contributions';

function writeFile(contents) {
  fs.writeFile('response.json', contents, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Today\'s Contributions saved to response.json');
  });
}

function getData(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function(err, result) {
        var calendar = result.svg.g[0].g;
        var currentWeek = calendar[calendar.length - 1].rect;
        var currentDay = currentWeek[currentWeek.length - 1].$;
        var resultString = JSON.stringify(currentDay, null, 2);

        writeFile(resultString);
      });
    }
  });
}

getData(url);