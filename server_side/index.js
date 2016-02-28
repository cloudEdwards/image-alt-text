
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  var html_view = '<html><head><title>Image Alt Text Generator</title></head>' +
  '<body><h2>Hello Worlds!</h2>' +
  '<img src="https://melinabeachturtlehatchery.files.wordpress.com/2010/07/turtle4.jpg">' +
  '<img src="http://science-all.com/images/animals/animals-05.jpg" style="width: 100%;">' +
  '</body></html>';

  res.send(html_view);
});


app.post('/listUsers', function (request, result) {

    console.log(request.body);

    var alt = ["alty"];
    result.send(JSON.stringify(alt));
})


app.get('/getVision', function (req, res) {

    // var image_array = {images: [{image: "https://melinabeachturtlehatchery.files.wordpress.com/2010/07/turtle4.jpg", alt: "TEST TURTLE alt text"}]};
    // res.send(JSON.stringify(image_array));

    console.log('get vision');

});



app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});