// var ex = {
//   config: "test config"
// }


// in .env
// var ex = {
//   config: {
//     TWITTER_API_KEY: "changed api key"
//     , SPOTIFY_API_KEY: "this key"

//   }
// }
// module.exports = ex;


require("dotenv").config();

// module.exports = ex;

// use for bonus
// var fs = require('fs');

var fs = require("fs");
// Load the NPM Package inquirer
var inquirer = require("inquirer");
// add spotify, twitter, request, dotenv
var Spotify = require("node-spotify-api");

var request = require("request");
var Twitter = require("twitter");


// added from homework
var keys = require("./keys.js");







function runSwitch(command, search) {

  switch (command) {
    case "my-tweets":
      myTweets();
      break;

    case "spotify-this-song":
      spotifyThis(search);
      break;

    case "movie-this":
      movieThis(search);
      break;

    case "do-what-it-says":
      doItdoIt();
      break;
  };

};




function myTweets() {

  var params = { screen_name: 'papajoh95548285' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      var myTweets = [];
      for (var i = 0; i < 19; i++) {
        myTweets.push({
          date: tweets[i].created_at,
          text: tweets[i].text
        });

      }
      console.log(myTweets);
      // TODO: send myTweets to file

    }
  });


};




function spotifyThis(songName) {
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({ type: 'track', query: 'thriller', limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(JSON.stringify(data,null,2)); 
    console.log("------")
    // artists name
    console.log("Artists Name: " + data.tracks.items[0].artists[0].name);
    console.log("------")
    console.log("song name: " + data.tracks.items[0].name);
    console.log("------")
    console.log("preview link: " + data.tracks.items[0].artists[0].external_urls.spotify);
    console.log("------")
    console.log("Album Name: " + data.tracks.items[0].name);
    console.log("------")

  });

};




function movieThis(movieName) {
  if (process.argv[3]) {
    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

        // console.log(JSON.parse(body));
        console.log("The title of the movie: " + JSON.parse(body).Title);
        console.log("This movie came out in: " + JSON.parse(body).Year);
        console.log("This movie is rated: " + JSON.parse(body).Rated);
        console.log("This movie originated in: " + JSON.parse(body).Country);
        console.log("If you speak " + JSON.parse(body).Language + " you won't need subtitles.");
        console.log("Brief plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      };
    });
  } else {
    request("http://www.omdbapi.com/?t=" + "mr Nobody" + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

        // console.log(JSON.parse(body));
        console.log("The title of the movie: " + JSON.parse(body).Title);
        console.log("This movie came out in: " + JSON.parse(body).Year);
        console.log("This movie is rated: " + JSON.parse(body).Rated);
        console.log("This movie originated in: " + JSON.parse(body).Country);
        console.log("If you speak " + JSON.parse(body).Language + " you won't need subtitles.");
        console.log("Brief plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      };
    });
  }
};






function doItdoIt() {

  fs.readFile("random.txt", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    };
    // take this data, split by comma, set array.  use array[0] for command in spotify, and array[1] for search
    var arrayRandom = data.split(",");
    console.log(data);
    console.log(arrayRandom);

    switch (arrayRandom[0]) {
      case "movie-this":movieThis(arrayRandom[1]);
        
        break;
        case "spotify-this":spotifyThis(arrayRandom[1]);
        
        break;
        case "my-tweets":myTweets();
        
        break;
    
      default:
        break;
    }

  });


};

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var search = process.argv[3];
// take the 3rd array and set equal to different functions.  Switch or If then
// the switch function will tell us which function to run.  


runSwitch(command, search);