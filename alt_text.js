
jQuery( document ).ready(function($) {
    console.log( "ready!" );

    var images = $('img');
    $.each( images, function(index, image) {
        //debugger;
        image.alt = image.alt + " image analysis";
        console.log(image.alt);
    });

});