$( '#btn_download' ).on('click', () => {
    window.open( '/download' )
    });

$( document ).ready( () => {
    $('#uploadForm').submit( ( e ) => {

        $( e.target ).ajaxSubmit({

            error: ( xhr ) => {
                status( 'Error: ' + xhr.status );
            },
            success: ( response ) => {
                console.log( response );
                $( '#status' ).html( 'ok' );

            }
        });
        
        return false;
    });
});