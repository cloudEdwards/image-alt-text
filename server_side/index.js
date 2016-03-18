
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
  '<style> img:focus { border: 5px solid red;  } </style>' +
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

        // console.log('vision result');
        // console.log(JSON.stringify(result));
        var Annotations = require('./Annotations');
        console.log(Annotations);

        var alt_text_array = Annotations.getAltText(result);
        console.log('alt_text_array result');
        console.log(alt_text_array);
        res.send( JSON.stringify(alt_text_array) );
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

    var obj_array = [

        {"labelAnnotations": [
              {"mid":"/m/01g317","description":"person","score":0.8503629},
              {"mid":"/m/07glzq","description":"sketch","score":0.80754495},
              {"mid":"/m/012h24","description":"comics","score":0.64026254},
              {"mid":"/m/01kr8f","description":"illustration","score":0.63674605},
              {"mid":"/m/0250x","description":"costume","score":0.55948329},
              {"mid":"/m/06msq","description":"sculpture","score":0.546911},
              {"mid":"/m/0jyt6","description":"masque","score":0.51925671}
            ],
            "textAnnotations":
              [
                {"locale":"en","description":"case\n","boundingPoly":{"vertices":[{"x":1295,"y":331},{"x":1355,"y":331},{"x":1355,"y":408},{"x":1295,"y":408}]}}
              ]
        },
        { "faceAnnotations":
            [
              {"boundingPoly":{"vertices":[{"x":244,"y":102},{"x":496,"y":102},{"x":496,"y":395},{"x":244,"y":395}]},"fdBoundingPoly":{"vertices":[{"x":272,"y":158},{"x":470,"y":158},{"x":470,"y":356},{"x":272,"y":356}]},"landmarks":[{"type":"LEFT_EYE","position":{"x":337.3938,"y":218.20416,"z":-0.001832218}},{"type":"RIGHT_EYE","position":{"x":419.28421,"y":220.84396,"z":8.1314363}},{"type":"LEFT_OF_LEFT_EYEBROW","position":{"x":313.48865,"y":205.19203,"z":8.230155}},{"type":"RIGHT_OF_LEFT_EYEBROW","position":{"x":362.85269,"y":201.19072,"z":-9.2214594}},{"type":"LEFT_OF_RIGHT_EYEBROW","position":{"x":399.34665,"y":202.86572,"z":-5.576004}},{"type":"RIGHT_OF_RIGHT_EYEBROW","position":{"x":441.64514,"y":208.97079,"z":20.230223}},{"type":"MIDPOINT_BETWEEN_EYES","position":{"x":381.91592,"y":219.88815,"z":-11.668938}},{"type":"NOSE_TIP","position":{"x":384.27042,"y":255.05367,"z":-41.34404}},{"type":"UPPER_LIP","position":{"x":379.7449,"y":288.73322,"z":-29.473883}},{"type":"LOWER_LIP","position":{"x":377.82864,"y":310.42047,"z":-28.671944}},{"type":"MOUTH_LEFT","position":{"x":345.84515,"y":302.18835,"z":-14.205356}},{"type":"MOUTH_RIGHT","position":{"x":406.24283,"y":303.63907,"z":-8.8232546}},{"type":"MOUTH_CENTER","position":{"x":378.72464,"y":298.46597,"z":-26.046829}},{"type":"NOSE_BOTTOM_RIGHT","position":{"x":399.59122,"y":268.39514,"z":-11.9241}},{"type":"NOSE_BOTTOM_LEFT","position":{"x":359.18692,"y":265.90225,"z":-16.062235}},{"type":"NOSE_BOTTOM_CENTER","position":{"x":380.99191,"y":270.4928,"z":-26.612116}},{"type":"LEFT_EYE_TOP_BOUNDARY","position":{"x":342.06381,"y":214.70952,"z":-4.1386642}},{"type":"LEFT_EYE_RIGHT_CORNER","position":{"x":355.80927,"y":222.51138,"z":1.5613359}},{"type":"LEFT_EYE_BOTTOM_BOUNDARY","position":{"x":337.9718,"y":225.40892,"z":-1.6472507}},{"type":"LEFT_EYE_LEFT_CORNER","position":{"x":324.7298,"y":221.20703,"z":5.42574}},{"type":"LEFT_EYE_PUPIL","position":{"x":340.48645,"y":220.48724,"z":-2.1018426}},{"type":"RIGHT_EYE_TOP_BOUNDARY","position":{"x":417.4552,"y":217.87473,"z":3.3895707}},{"type":"RIGHT_EYE_RIGHT_CORNER","position":{"x":431.18335,"y":226.02005,"z":15.754127}},{"type":"RIGHT_EYE_BOTTOM_BOUNDARY","position":{"x":419.81815,"y":227.28593,"z":6.1647663}},{"type":"RIGHT_EYE_LEFT_CORNER","position":{"x":405.06345,"y":224.01477,"z":6.4034638}},{"type":"RIGHT_EYE_PUPIL","position":{"x":417.78363,"y":223.72305,"z":5.5546851}},{"type":"LEFT_EYEBROW_UPPER_MIDPOINT","position":{"x":339.80209,"y":192.57166,"z":-4.0337272}},{"type":"RIGHT_EYEBROW_UPPER_MIDPOINT","position":{"x":421.43893,"y":196.01634,"z":4.078176}},{"type":"LEFT_EAR_TRAGION","position":{"x":282.98038,"y":272.80225,"z":79.467972}},{"type":"RIGHT_EAR_TRAGION","position":{"x":453.96402,"y":280.29221,"z":96.623772}},{"type":"FOREHEAD_GLABELLA","position":{"x":381.46216,"y":200.67448,"z":-10.05166}},{"type":"CHIN_GNATHION","position":{"x":376.62943,"y":348.1629,"z":-24.853769}},{"type":"CHIN_LEFT_GONION","position":{"x":292.88791,"y":315.29205,"z":41.224228}},{"type":"CHIN_RIGHT_GONION","position":{"x":447.87607,"y":321.54749,"z":56.742146}}],"rollAngle":1.2919934,"panAngle":5.8214269,"tiltAngle":10.941969,
              "detectionConfidence":0.99998188,
              "landmarkingConfidence":0.75410324,
              "joyLikelihood":"VERY_UNLIKELY",
              "sorrowLikelihood":"VERY_UNLIKELY",
              "angerLikelihood":"UNLIKELY",
              "surpriseLikelihood":"VERY_UNLIKELY",
              "underExposedLikelihood":"VERY_UNLIKELY",
              "blurredLikelihood":"VERY_UNLIKELY",
              "headwearLikelihood":"VERY_LIKELY"}
            ],
            "labelAnnotations":
            [
              {"mid":"/m/01g317","description":"person","score":0.85595679}
            ],
            "textAnnotations":
            [
              {"locale":"en","description":"HAVE A DATE FOR\nVALENTINES DAY\nYES FEBRUARY 14TH.\nMEMEFUL COM\n"}
            ] 
        },
    ];


    // for (var i = 0; obj_array[1].textAnnotations.length > i; i++) {
    //     console.log(obj_array[1].textAnnotations[i].description);
    // }






    var Annotations = require('./Annotations');
    var output = [{ 'textAnnotations': '', 'faceAnnotations' : '', 'labelAnnotations' : ''}];
    console.log('ooooooo');
    console.log(Annotations.getAltText(obj_array));
  });
});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});