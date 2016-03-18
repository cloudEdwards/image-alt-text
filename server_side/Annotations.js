"use strict"

module.exports = {

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  },

  getAltText(vision_response){
      var reponse = [];
      for (var i = 0; vision_response.length > i; i++) {

          var output = {"face":"","text":"","label":""};

          for (var annotation in vision_response[i]) {
              switch(annotation) {

                  case "faceAnnotations":
                      var faceAn = this.faceAnnotations(vision_response[i][annotation]);
                      output.face = output.face + faceAn + " "; 
                      break;
                  case "textAnnotations":
                      var textAn = this.getDescription(vision_response[i][annotation]);
                      output.text =  output.text + textAn + " "; 
                      break;
                  case "labelAnnotations":
                      var labelAn = this.getDescription(vision_response[i][annotation]);
                      output.label = output.label + labelAn + " "; 
                      break;
              }
          }
          reponse.push(output);
      };
      return reponse;
  },

  faceAnnotations(annotation){
      var output = '';
      for (var i = 0; annotation.length > i; i++) {
          if ('headwearLikelihood' in annotation[i]) {
              output = output + annotation[i].headwearLikelihood + " ";
          }
      }
      return output;
  },

  getDescription(annotation){
      var output = '';
      for (var i = 0; annotation.length > i; i++) {
          if ('description' in annotation[i]) {
              output = output + annotation[i].description + " ";
          }
      }
      return output;
  },

}
