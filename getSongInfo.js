var songFinder = require('./FindSong.js');
var videoFinder = require('./FindVideo.js');


module.exports = function (songGenre, songNumber, callback) {
    var songInformation = songFinder('http://www.indieshuffle.com/music/' +songGenre ,songNumber , function(err, list) {
        if(err)
	       return console.error(err);
	   
	       
	        videoFinder('http://www.youtube.com/results?search_query=' + list[0] + list[1], function(error, link) {
	           if(error) return console.error(error);
		       
		       console.log(link);
			   var information = [list[0], list[1], link]; 
			   return callback(null, information);
			   
			   
		       });	    
	       
	   
	   }
	  )
	  
	 
	  }