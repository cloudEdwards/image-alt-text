
var express = require('express');
var app = express();
var fs = require("fs");


app.get('/', function (req, res) {
  var html_view = '<html><head><title>Image Alt Text Generator</title></head><body><h2>Hello Worlds!</h2><img src="https://melinabeachturtlehatchery.files.wordpress.com/2010/07/turtle4.jpg"></body></html>';

  res.send(html_view);
});


app.get('/listUsers', function (req, res) {

    var image_array = {images: [{image: "https://melinabeachturtlehatchery.files.wordpress.com/2010/07/turtle4.jpg", alt: "TEST TURTLE alt text"}]};
    res.send(JSON.stringify(image_array));
})



app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});