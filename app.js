var request = require('request');
var parseString = require('xml2js').parseString;
var nanybar = require('nanybar');
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

function updateIcon(data) {
  var dataFill = data.fill;
  var dataCount = data["data-count"];

  var iconColors = {
    '#eeeeee': function() {
      return nanybar('inactive--light');
    },
    '#d6e685': function() {
      return nanybar('active-1');
    },
    '#8cc665': function() {
      return nanybar('active-2');
    },
    '#44a340': function() {
      return nanybar('active-3');
    },
    '#1e6823': function() {
      return nanybar('active-4');
    }
  };

  if (iconColors[dataFill]) {
    return iconColors[dataFill]();
  } else if (dataCount >= 1) {
    return nanybar('active-1');
  } else {
    return nanybar('warning-red');
  }
}

function getData(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function(err, result) {
        var calendar = result.svg.g[0].g;
        var currentWeek = calendar[calendar.length - 1].rect;
        var currentDay = currentWeek[currentWeek.length - 1].$;
        var resultString = JSON.stringify(currentDay, null, 2);

        updateIcon(currentDay);
        // writeFile(resultString);
      });
    }
  });
}

setInterval(function(){
  getData(url);
}, 30000);

getData(url);