const
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './upload');
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    }),
    upload = multer({storage: storage})
        .array('userPhoto', 10);
/**
 * jsdoc3
 * @param app
 */
module.exports = ( app ) => {
    app.post('/upload', (req, res, next) => {
        upload(req, res, (err) => {
            console.log(req.body);
            console.log(req.files);
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });
};

