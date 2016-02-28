
jQuery( document ).ready(function($) {
    console.log( "ready!" );

    var image_list = $('img');
    var image_objs = []
    var i = 0;
    while ( image_list[i] ) {
        image_objs[i] = 
            {
                'src' : image_list[i].src,
                'alt' : image_list[i].alt,
                'title' : image_list[i].title
            }
        i ++;
    } 

    $.post("http://localhost:5000/alt_text_vision/image_vision/", JSON.stringify(image_objs) ).done(function(result){
        console.log( "ajax success!" );
        console.log( result );
        $.each( result, function(index, value) {
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