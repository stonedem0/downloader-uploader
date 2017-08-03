const
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './upload');
        },
        filename: (req, file, callback) => {
            console.log( typeof file);
            callback(null, file.originalname);
        }
    }),

    upload = multer ({ storage: storage }).array('userPhoto', 10);


    // console.log(typeof upload, multer);
    // console.log(storage);


/**
 * jsdoc3
 * @param app
 */
module.exports = ( app ) => {
    app.post('/upload', (req, res, next) => {
        upload(req, res, (err) => {
            // console.log(upload);
            //
            // // console.log(req, res);
            // console.log( typeof req.body);
            // console.log( typeof req.files, req.files);
            if (err) {
                res.json( { error: err.message, test: true } );
                return next(err);
            }
            res.end("File is uploaded");
        });
    });
};

