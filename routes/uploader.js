const
    multer = require( 'multer' ),
    storage = multer.diskStorage({
        destination: ( req, file, callback ) => {
            callback(null, './upload');
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
            console.log(file.mimetype);
        }
    }),

    upload = multer ({ storage: storage }).array( 'userPhoto', 10 );


/**
 * upload module
 * @param app
 */


module.exports = ( app ) => {
    app.post( '/upload', ( req, res, next ) => {
        upload( req, res, (err) => {
            console.log( req.body );
            console.log( req.files );
            if (err) {
                next(new Error('something wrong'));
                return;
            }
            // res.end( 'File is uploaded' );
            next();

        });
    });
};

