/**
 * download module
 * @param app
 */

module.exports = ( app ) => {
    app.get('/download', ( req, res, next ) => {
        let file = './downloads/eva.png';
        // file = '';
        if ( !file ) {
            console.log( 1 );
            next( new Error( 'something wrong' ) );
        }
        else {
            console.log(2);
            console.log(file);
            res.download(file);
        }
    });
};


