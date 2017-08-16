const
    multer = require( 'multer' ),
    storage = multer.diskStorage({
        destination: ( req, file, callback ) => {
            callback(null, './upload');
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
            console.log(file);
        }
    }),

    upload = multer ({ storage: storage }).array( 'userPhoto', 10 );


/**
 * upload module
 * @param app
 */


module.exports = ( app ) => {

    app.post( '/upload', ( req, res, next ) => {
        // console.log(req);
        upload( req, res, (err) => {

            // console.log(file);
            if (err) {
                next(new Error('something wrong'));
                return;
            }
            res.end( 'File is uploaded' );
            next();

        });
    });
};


