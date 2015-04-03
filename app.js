var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

// Github username
var username = "bradcerasani";
var url = "https://github.com/users/" + username + "/contributions";

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parseString(body, function(err, result) {
      var currentWeek = result.svg.g[0].g[52].rect;
      var currentDay = currentWeek[currentWeek.length - 1].$;
      var resultString = JSON.stringify(currentDay, null, 2);

      fs.writeFile("response.json", resultString, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Today's contributions saved to response.json");
      });
    });
  }
});