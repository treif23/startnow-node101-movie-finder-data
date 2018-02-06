const express = require('express');
const app = express();
var morgan = require('morgan');
var axios = require('axios');
var bodyParser = require('body-parser');

app.use(morgan('dev'));

//var http = require('http');

/*http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
});*/

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

var cache = {
  url: '',
  data: null
}




///?i=tt3896198
app.get('/', function (req, res) {

  if (req.query.i) {
    if (cache.url === req.query.i) {
      res.send(cache.data);

    } else
      axios
        .get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
        .then(function (response) {
          cache.url = req.query.i;
          cache.data = response.data;
          res.send(response.data);
          console.log(cache);

        }, function (error) {
          res.send('error ' + error);

        }
        );

  }
  else {
    if(cache.url === req.query.t){
      res.send(cache.data);
    }

    var query = req.query.t && req.query.t.replace(' ', '%20');

    axios
      .get('http://www.omdbapi.com/?t=' + query + '&apikey=8730e0e')
      .then(function (response) {
        cache.url = req.query.t;
        cache.data = response.data;
        res.send(response.data);
        console.log(cache);

      },


    );
  }
})

app.get('/ping', function (req, res) {
  res.send('pong');
})


/*$.getJSON('https://www.omdbapi.com/?apikey=8730e0e&i=tt0111161', function(data) {
  $('#movie-title').text(data.Title);
  $('#movie-description').text(data.Description);
  $('#movie-year').text(data.Year);
});*/


module.exports = app;