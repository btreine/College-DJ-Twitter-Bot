var http = require('http')
var bl = require('bl')

module.exports = function(youTubeSearch, callback) {
    http.get(youTubeSearch, function (response) {
    response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    data = data.toString()
    var position = data.indexOf("/watch?v=");
	var str = data.substring(position, position + 100).split('"');
	return callback(null, str[0]);
  }))  
})

}