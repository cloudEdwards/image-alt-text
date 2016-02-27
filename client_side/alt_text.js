
jQuery( document ).ready(function($) {
    console.log( "ready!" );

    var image_list = $('img');
    var image_objs = 
        { 'images':
            [
                {
                    'src' : '',
                    'alt' : '',
                    'title' : ''
                }
            ]
        };
    var i = 0;
    while ( image_list[i] ) {
        image_objs.images[i] = 
            {
                'src' : image_list[i].src,
                'alt' : image_list[i].alt,
                'title' : image_list[i].title
            }
        i ++;
    } 

    debugger;

    $.post("http://localhost:4000/listUsers", JSON.stringify(image_objs) ).done(function(result){
        var parsed_result = $.parseJSON(result);
        console.log( "ajax success!" );
        console.log( parsed_result );



        // $.each( parsed_result, function(index, value) {
        //     var page_images = $('img');
        //     console.log( "image alt!" );
        //     page_images[index].alt += " image analysis: ";// + value.alt;
        // });
    });


    
});