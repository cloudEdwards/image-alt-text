"use strict"

module.exports = {

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  },

  getAltText(vision_response){
      var whitelist = ['faceAnnotations', 'textAnnotations', 'labelAnnotations'];
      var output = new Object();
      for (var annotation in vision_response) {
          switch(annotation) {

              case "faceAnnotations":
                  var faceAn = this.faceAnnotations(vision_response[annotation]);
                  output.face = output.face + ", " + faceAn; 
                  break;
              case "textAnnotations":
                  var textAn = this.getDescription(vision_response[annotation]);
                      output.text =  output.text + ", " + textAn; 
                  break;
              case "labelAnnotations":
                  var labelAn = this.getDescription(vision_response[annotation]);
                  output.label = output.label + ",  " + labelAn; 
                  break;
          }
      }
      return output;
  },

  faceAnnotations(annotation){
      return "facey";
  },

  getDescription(annotation){
      var output = '';
      for (var i = 0; annotation.length > i; i++) {
          if ('description' in annotation[i]) {
              output = output + ", " + annotation[i].description;
          }
      }
      return output;
  },

}
