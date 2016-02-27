'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
vision.init({auth: ''})

// construct parameters
const requirements = new vision.Request({
  image: new vision.Image('./turtle.jpg'),
  features: [
    new vision.Feature('FACE_DETECTION', 4),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

// send single request
vision.annotate(requirements).then((response) => {
  // handling response
  console.log(JSON.stringify(response.responses))
}, (e) => {
  console.log('Error: ', e)
})