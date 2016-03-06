
jQuery( document ).ready(function($) {
    console.log( "ready!" );

    var image_list = $('img');
    var image_objs = {};
    var i = 0;
    while ( image_list[i] ) {
        image_objs[ 'image' + i ] = 
            {
                'src' : image_list[i].src,
                'alt' : image_list[i].alt,
                'title' : image_list[i].title
            }
        i ++;
    } 

    $.post("http://localhost:4000/getVision", image_objs ).done(function(result){
        console.log( "ajax success!" );
        parsed_result = $.parseJSON( result );
        console.log( parsed_result );

        $.each( parsed_result, function(index, value) {
            console.log( "image alt!" );
            page_images = $('img');
            for (var i = page_images.length - 1; i >= 0; i--) {
                if ( page_images[i].src == value.src ) {
                    page_images[i].alt += value.alt;
                }
            };
        });
    });


    
});