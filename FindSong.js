var http = require('http');
var bl = require('bl');
var numOfSongs = 0;
var data;


module.exports = function(indieShuffleURL, numOfSongs, callback) {
    http.get(indieShuffleURL, function(response) {
        response.pipe(bl(function (error, data) {
	        if(error) console.error(error);
		    data = data.toString();
			var position = data.indexOf('data-track-artist');
			for(var i = 0; i < 1 +numOfSongs; i++) {
			    var position = data.indexOf('data-track-artist', position + 1);
			}
			var theArtist = data.substring(position+19, position + 50).split('"');
			
			var songTitle = data.substring(position+50, position+100).split('"',2);
		
			data = [theArtist[0], songTitle[1]];
			
			return callback(null, data);
			
			//console.log(data.substring(position));
			//console.log(data.indexOf('data-track-artist'));
			//console.log(data.indexOf('data-track-artist'));
			
}))

})

}