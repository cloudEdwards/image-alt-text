
jQuery( document ).ready(function($) {
    console.log( "ready!" );

    // Need to post, can't post in local dev
    // src_array is all the image src from page
    var images = $('img');
    var src_array = images.map(function() {
        return $(this).attr("src");
    });

    // API sends back test response
    $.ajax({
        url: "http://localhost:4000/listUsers", 
        success: function(result){

        var parsed_result = $.parseJSON(result);

        $.each( parsed_result.images, function(index, value) {
            var page_images = $('img');
            page_images[index].alt += " image analysis: " + value.alt;
        });
    
    }});




    // var data = '{ name: "John", time: "2pm" }';
    // $.post( "test.php", data )
    // .done(function( data ) {
    //     alert( "Data Loaded: " + data );
    //   });

    
});