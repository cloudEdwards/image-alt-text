
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
api_key = require('./config')
vision.init({auth: api_key.API_KEY })

app.get('/', function (req, res) {
  var html_view = '<html><head><title>Image Alt Text Generator</title></head>' +
  '<body><h2>Hello Worlds!</h2>' +
  '<img src="http://www.hdwallpaperscool.com/wp-content/uploads/2014/01/batman-arkham-city-3d-hd-wallpapers-free-download-cool-wallpapers-for-your-comuter-screens.jpg" style="width: 100%;">' +
  '<img src="http://quotesnhumor.com/wp-content/uploads/2014/11/Best-funny-Memes-Funnies.jpg" style="width: 100%;">' +
  '</body></html>';

  res.send(html_view);
});


app.post('/getVision', function (req, res) {
    var post_body = req.body;
    var image_list = [];
    // extract dat from post
    for ( var key in post_body ) {
       if ( post_body.hasOwnProperty(key) ) {
          // construct parameters
          // 1st image of request is load from local
          var vision_obj = new vision.Request({
            image: new vision.Image({
              url: post_body[key].src
            }),
            features: [
              new vision.Feature('FACE_DETECTION', 4),
              new vision.Feature('LABEL_DETECTION', 10),
              new vision.Feature('TEXT_DETECTION', 1),
            ]
          });
          image_list.push( vision_obj );
       }
    }

    // send multi requests by one API call
    vision.annotate(image_list).then((res) => {
      // handling response for each request
      return res.responses;
    }, (e) => {
      return 'Error: ' + e;
    }).then( function(result){
        console.log(JSON.stringify(result));
        console.log("image respose");
        res.send(JSON.stringify(result));
    });



    
});


app.get('/promise', function (req, res) {
  
  var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…

    if (true) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  });

  promise.then(function(result) {
      return result + " chain 1 "; // "Stuff worked!"
  }, function(err) {
      return err; // Error: "It broke"
  }).then(function(result) {
      console.log(result);
  }
  );
  

});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});