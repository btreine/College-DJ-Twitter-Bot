// The purpose of my twitter bot is to emulate the function of a college disc jockey. College radio stations are a platform for new artists to 
// use to distribute their work and it is that endeavour that I was hoping to help facilitate through Twitter. The community I have engaged with was new
// music artist, or underground music through the hash tag: #listenToThis. My twitter bot offers to the community a central hub that hourly posts a new song from up and coming artists hourly, as well as retweeting the most popular tweet with the #listenToThis hashtag to generate more exposure. My bot is similar to a radio station in a sense playing music videos. The community has thus far has not interacted with my twitterbot, however the longer the bot runs the more opportunity for exposure is available 




var Twit = require('twit');
var T = new Twit(require('./config.js'));
var information = require('./getSongInfo.js');
var fs = require('fs');
var count = 1;
var d = new Date();
var currentDay = d.getDay();
var retweetSearch = {q: "#ListenToThis", count: 100, result_type: "recent"};

function newSong(num) {
	var d = new Date();
    var day = d.getDay();
    var textFile = day + '.txt';
    var genre = fs.readFileSync(textFile, 'utf8');
	
	information(genre, num, function(err, data) {
	    if(err) return console.error(err);
		
		var tweet = 'Song number: ' + num +' '+ data[1] + ' by ' + data[0] + ' link:  https://www.youtube.com/' + data[2] + ' #listentothis' + " #" + genre;
		console.log(tweet.length);
		console.log(tweet);
		
		T.post('statuses/update', {status: tweet} , function (error, response) {
			if (error) {
				console.error(error);
			}
			if (response) {
				console.log('you did it!');
			}
		});
		});
	  }
	
function checkDay(theDay) {
    var date = new Date();
    var currentday = date.getDay();
    if(currentDay !== theDay) {
        count = 1;
}
}		
function retweetMostLiked() {
	T.get('search/tweets', retweetSearch, function (error, data) {
	  
	  
	  var mostLiked = findMostLiked(data.statuses);
	
	  
	  
	  if (!error) {

		var retweetId = mostLiked;
		
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}

			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  


	  }
	  })
	  }

function findMostLiked(someData) {
   var max = 0;
   var maxIndex = 0;
	for(var i = 0; i < 100; i++) {
	    var text = JSON.stringify(someData[i]);
		var moreText = text.substr(text.indexOf('retweet_count'), 40);
		moreText = moreText.split(',');
		var retweetCount = moreText[0].substr(15);
		var favoriteCount = moreText[1].substr(17);
		retweetCount = parseInt(retweetCount);
		favoriteCount = parseInt(favoriteCount);
		var totalCount = retweetCount + favoriteCount;
		if(totalCount > max) {
		    maxIndex = i;
			max = totalCount
			}
	}
	console.log(someData[maxIndex].id_str);
	return someData[maxIndex].id_str;
	}	  


function postSong() {
   checkDay(currentDay);
   newSong(count);
   count++;
   console.log(count);
  }
  
postSong();
setInterval(postSong, 1000 * 60 * 60);
setInterval(retweetMostLiked, 1000 * 60 * 60 * 12);
